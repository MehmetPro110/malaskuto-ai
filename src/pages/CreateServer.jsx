import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Server, ArrowLeft, Cpu, HardDrive, MemoryStick } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateServer = () => {
  const [nodes, setNodes] = useState([]);
  const [eggs, setEggs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    node_id: '',
    egg_id: '',
    nest_id: '',
    plan: '1gb',
  });

  const plans = [
    { id: '1gb', name: 'Starter', ram: '1 GB', cpu: '1 Core', disk: '10 GB' },
    { id: '2gb', name: 'Standard', ram: '2 GB', cpu: '1 Core', disk: '10 GB' },
    { id: '3gb', name: 'Premium', ram: '3 GB', cpu: '1 Core', disk: '10 GB' },
  ];

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get('/application/options');
        setNodes(response.data.nodes);
        setEggs(response.data.eggs);
        if (response.data.nodes.length > 0) {
          setFormData((prev) => ({ ...prev, node_id: response.data.nodes[0].id }));
        }
        if (response.data.eggs.length > 0) {
          setFormData((prev) => ({
            ...prev,
            egg_id: response.data.eggs[0].id,
            nest_id: response.data.eggs[0].nest_id
          }));
        }
      } catch (err) {
        console.error('Failed to fetch options', err);
        setError('Failed to load server options. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'egg_id') {
      const selectedEgg = eggs.find(egg => egg.id.toString() === value);
      setFormData(prev => ({
        ...prev,
        egg_id: value,
        nest_id: selectedEgg ? selectedEgg.nest_id : prev.nest_id
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');

    try {
      await api.post('/application/servers', formData);
      navigate('/');
    } catch (err) {
      console.error('Failed to create server', err);
      setError(err.response?.data?.error || 'Failed to create server');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
        <Server className="animate-spin text-blue-500 h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 rounded-lg bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Deploy New Server</h1>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-500/10 p-4 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-xl">
          {/* Server Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Server Name</label>
            <input
              type="text"
              name="name"
              required
              className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="My Awesome Server"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Software / Egg Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Software (Game/App)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eggs.map((egg) => (
                <label
                  key={egg.id}
                  className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none ${
                    formData.egg_id.toString() === egg.id.toString()
                      ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500'
                      : 'border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="egg_id"
                    value={egg.id}
                    className="sr-only"
                    checked={formData.egg_id.toString() === egg.id.toString()}
                    onChange={handleChange}
                  />
                  <div className="flex flex-col">
                    <span className="block text-sm font-medium text-white">{egg.name}</span>
                    <span className="mt-1 flex items-center text-xs text-gray-400 line-clamp-2">
                      {egg.description || 'No description available.'}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Node Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location / Node</label>
            <select
              name="node_id"
              required
              className="block w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none"
              value={formData.node_id}
              onChange={handleChange}
            >
              {nodes.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.name}
                </option>
              ))}
            </select>
          </div>

          {/* Plan Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Server Plan</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <label
                  key={plan.id}
                  className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-all ${
                    formData.plan === plan.id
                      ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500'
                      : 'border-gray-700 bg-gray-800/30 hover:bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan.id}
                    className="sr-only"
                    checked={formData.plan === plan.id}
                    onChange={handleChange}
                  />
                  <div className="flex flex-col w-full">
                    <span className="block text-base font-semibold text-white mb-2">{plan.name}</span>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-400 gap-2">
                        <MemoryStick size={16} className="text-gray-500" /> {plan.ram} RAM
                      </div>
                      <div className="flex items-center text-sm text-gray-400 gap-2">
                        <Cpu size={16} className="text-gray-500" /> {plan.cpu}
                      </div>
                      <div className="flex items-center text-sm text-gray-400 gap-2">
                        <HardDrive size={16} className="text-gray-500" /> {plan.disk} Disk
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <button
              type="submit"
              disabled={creating}
              className="w-full flex justify-center items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-all"
            >
              {creating ? (
                <>
                  <Server className="animate-spin" size={20} /> Deploying Server...
                </>
              ) : (
                'Deploy Server Now'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServer;
