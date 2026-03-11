import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { ArrowLeft, Play, Square, RefreshCw, Server, AlertCircle, Terminal } from 'lucide-react';

const ServerConsole = () => {
  const { uuid } = useParams();
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('offline'); // offline, starting, running, stopping
  const wsRef = useRef(null);
  const logsEndRef = useRef(null);

  useEffect(() => {
    const fetchServerDetails = async () => {
      try {
        const serverRes = await api.get(`/servers/${uuid}`);
        setServer(serverRes.data);

        // Fetch WS details and setup after setting server details
        const wsRes = await api.get(`/servers/${uuid}/websocket`);
        if (wsRes.data.token && wsRes.data.socket) {
          setupWebSocket(wsRes.data.token, wsRes.data.socket);
        } else {
          console.warn("Could not retrieve valid websocket details");
        }
      } catch (err) {
        console.error('Failed to load server details', err);
        setError('Failed to load server details');
      } finally {
        setLoading(false);
      }
    };

    fetchServerDetails();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [uuid]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const setupWebSocket = (token, url) => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ event: 'auth', args: [token] }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === 'auth success') {
        ws.send(JSON.stringify({ event: 'send logs', args: [null] }));
      } else if (data.event === 'status') {
        setStatus(data.args[0]);
      } else if (data.event === 'console output') {
        setLogs((prev) => [...prev, data.args[0]]);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  };

  const sendPowerAction = async (action) => {
    try {
      await api.post(`/servers/${uuid}/power`, { signal: action });
      // Optimistic update
      if (action === 'start') setStatus('starting');
      if (action === 'stop' || action === 'kill') setStatus('stopping');
      if (action === 'restart') setStatus('starting');
    } catch (err) {
      console.error(`Failed to send ${action} action`, err);
      // Let WS handle actual state
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
        <Server className="animate-spin text-blue-500 h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white flex-col gap-4">
        <AlertCircle className="text-red-500 h-16 w-16" />
        <p className="text-xl">{error}</p>
        <Link to="/" className="text-blue-500 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  if (!server) {
    return null;
  }

  const getStatusColor = () => {
    switch (status) {
      case 'running': return 'bg-emerald-500';
      case 'starting': return 'bg-yellow-500';
      case 'stopping': return 'bg-orange-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{server.name}</h1>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-white border border-gray-700 gap-2`}>
                  <span className={`h-2 w-2 rounded-full ${getStatusColor()}`}></span>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-400 font-mono mt-1">{server.uuid}</p>
            </div>
          </div>

          {/* Power Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => sendPowerAction('start')}
              disabled={status === 'running' || status === 'starting'}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600/30 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play size={16} /> Start
            </button>
            <button
              onClick={() => sendPowerAction('restart')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 rounded-lg font-medium transition-colors"
            >
              <RefreshCw size={16} /> Restart
            </button>
            <button
              onClick={() => sendPowerAction('stop')}
              disabled={status === 'offline' || status === 'stopping'}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-500 hover:bg-red-600/30 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Square size={16} /> Stop
            </button>
            <button
              onClick={() => sendPowerAction('kill')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-red-500 hover:bg-gray-700 rounded-lg font-medium transition-colors"
              title="Force Kill (Use with caution)"
            >
              Kill
            </button>
          </div>
        </div>

        {/* Console Section */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-xl overflow-hidden flex flex-col h-[600px] mt-6">
          <div className="bg-gray-800/50 px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <Terminal size={18} className="text-gray-400" />
            <span className="font-medium text-gray-300 text-sm">Live Server Console</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-black/50 text-gray-300">
            {logs.length === 0 ? (
              <p className="text-gray-500 italic">No console output available. Start the server to view logs.</p>
            ) : (
              logs.map((log, index) => {
                // Remove basic ansi escape codes so they dont render weirdly
                const strippedLog = typeof log === 'string' ? log.replace(/\x1b\[[0-9;]*m/g, '') : '';
                return <div key={index} className="whitespace-pre-wrap break-words">{strippedLog}</div>;
              })
            )}
            <div ref={logsEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServerConsole;
