import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Server, Activity, LogOut, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await api.get('/servers');
        setServers(response.data.servers);
      } catch (error) {
        console.error('Error fetching servers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-2">
              <Server className="text-blue-500" />
              <span className="font-bold text-lg tracking-tight">Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Your Servers</h1>
          <Link to="/create-server" className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
            <Plus size={16} />
            Create Server
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Activity className="animate-spin text-blue-500" size={32} />
          </div>
        ) : servers.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl bg-gray-900/30">
            <Server className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No servers found</h3>
            <p className="text-gray-400 mb-6">You don't have any servers yet. Create one to get started.</p>
            <Link to="/create-server" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors">
              <Plus size={16} />
              Create Server
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servers.map((server) => (
              <Link
                key={server.uuid}
                to={`/server/${server.uuid}`}
                className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:bg-gray-800/80 hover:border-gray-700 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Server size={20} />
                    </div>
                    <h3 className="font-semibold text-white truncate max-w-[150px]">{server.name}</h3>
                  </div>
                  {/* Status Indicator (Mocking for now, will implement actual status later) */}
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="space-y-2 mt-4 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Node</span>
                    <span className="text-gray-300 font-mono">{server.node || 'Node 1'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory</span>
                    <span className="text-gray-300">{server.limits.memory} MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CPU</span>
                    <span className="text-gray-300">{server.limits.cpu}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
