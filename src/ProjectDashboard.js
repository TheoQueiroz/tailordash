import React, { useState, useMemo } from 'react';
import { Plus, Filter, Calendar, Clock, Edit2, Link2, Trello, Save, X, Search, Info } from 'lucide-react';

const ProjectDashboard = () => {
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    
    {
      id: 1,
      cliente: "Cliente A",
      job: "Projeto 1",
      numeroFuzzr: "FZ001",
      gestao: "Celine",
      coordenador: "Felipe Colenci",
      produtores: "Gustavo Marques",
      escopo: "Produção de trilha sonora",
      observacoes: "Projeto inicial com requisitos básicos",
      dataInicio: "2024-03-15",
      dataUltimoStatus: "2024-03-20",
      status: "Online",
      estaCom: "Fuzzr", // Novo campo
      googleDriveLink: "https://drive.google.com/exemplo",
      historico: [
        { 
          data: "2024-03-15", 
          status: "Kickoff", 
          modificacao: "Projeto criado",
          observacoesAnteriores: "",
          observacoesNovas: "Projeto inicial com requisitos básicos"
        },
      ]
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    cliente: "",
    job: "",
    numeroFuzzr: "",
    gestao: "",
    coordenador: "",
    produtores: "",
    escopo: "",
    observacoes: "",
    dataInicio: "",
    status: "",
    googleDriveLink: ""
  });

  // Status LED Component
  const StatusLED = ({ status }) => {
    const ledColors = {
      Kickoff: 'bg-blue-500',
      PPM: 'bg-yellow-500',
      'Aguardando Retorno': 'bg-yellow-300',
      'Stand-By': 'bg-gray-400',
      Offline: 'bg-red-500',
      Online: 'bg-green-500',
      Finalizado: 'bg-gray-500'
    };
  
    const pulseAnimation = status === 'Online' ? 'animate-pulse' : '';
    
    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${ledColors[status]} ${pulseAnimation}`}>
          <div className={`w-3 h-3 rounded-full ${ledColors[status]} opacity-75 blur-sm`} />
        </div>
        <span className={`px-2 py-1 rounded-full text-white text-sm ${ledColors[status]}`}>
          {status}
        </span>
      </div>
    );
  };
  const filteredProjectsByPeriod = useMemo(() => {
    if (!filterStartDate || !filterEndDate) return projects; // Se não houver datas, mostre todos os projetos
  
    const start = new Date(filterStartDate);
    const end = new Date(filterEndDate);
  
    return projects.filter(project => {
      const projectDate = new Date(project.dataInicio);
      return projectDate >= start && projectDate <= end;
    });
  }, [filterStartDate, filterEndDate, projects]);
  <div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
  <div className="flex gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Data Início</label>
      <input 
        type="date" 
        value={filterStartDate}
        onChange={(e) => setFilterStartDate(e.target.value)}
        className="mt-1 p-2 border rounded w-full"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Data Fim</label>
      <input 
        type="date" 
        value={filterEndDate}
        onChange={(e) => setFilterEndDate(e.target.value)}
        className="mt-1 p-2 border rounded w-full"
      />
    </div>
  </div>
  <div className="flex items-center gap-2">
    <p className="text-lg font-semibold">Projetos no Período:</p>
    <span className="text-xl font-bold text-blue-500">{filteredProjectsByPeriod.length}</span>
  </div>
</div>

  // Project Details Modal
  const ProjectDetailsModal = ({ project, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{project.job} - {project.numeroFuzzr}</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-semibold">Cliente:</p>
              <p>{project.cliente}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <StatusLED status={project.status} />
            </div>
            <div>
              <p className="font-semibold">Data de Início:</p>
              <p>{new Date(project.dataInicio).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Gestão:</p>
              <p>{project.gestao}</p>
            </div>
            <div>
              <p className="font-semibold">Coordenador:</p>
              <p>{project.coordenador}</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold">Produtor(es) Musical(is):</p>
              <p>{project.produtores}</p>
            </div>
            <div>
              <p className="font-semibold">Está Com:</p>
              <p>{project.estaCom}</p>
            </div>
          </div>
          <div className="mb-4">
              <p className="font-semibold">Escopo:</p>
              <p>{project.escopo}</p>
            </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Observações:</h3>
            <p>{project.observacoes || 'Sem observações'}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Histórico de Mudanças:</h3>
            <div className="space-y-2">
              {project.historico.map((entry, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">{new Date(entry.data).toLocaleDateString()}</span>
                    <span className="text-sm text-gray-600">{entry.status}</span>
                  </div>
                  <p className="text-sm font-semibold">{entry.modificacao}</p>
                  {entry.observacoesAnteriores && entry.observacoesNovas && (
                    <div className="text-sm text-gray-500 mt-1">
                      <p><strong>Observações Antes:</strong> {entry.observacoesAnteriores}</p>
                      <p><strong>Observações Depois:</strong> {entry.observacoesNovas}</p>
                    </div>
                  )}
                  {entry.observacoesAnteriores && entry.escopoNovas && (
                    <div className="text-sm text-gray-500 mt-1">
                      <p><strong>Escopo Antes:</strong> {entry.escopoAnteriores}</p>
                      <p><strong>Escopo Depois:</strong> {entry.escopoNovas}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add new project handler
  const handleAddProject = (e) => {
    e.preventDefault();
    const newProjectEntry = {
      ...newProject,
      id: projects.length + 1,
      dataInicio: newProject.dataInicio,
      dataUltimoStatus: newProject.dataInicio,
      historico: [{ 
        data: newProject.dataInicio, 
        status: newProject.status, 
        modificacao: "Projeto criado" 
      }]
    };

    setProjects([...projects, newProjectEntry]);
    resetForm();
  };

  // Edit project handler
  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({...project});
    setShowForm(true);
  };

  // Update project handler
  const handleUpdateProject = (e) => {
    e.preventDefault();
  
    const updatedProjects = projects.map((proj) => {
      if (proj.id === editingProject.id) {
        const updatedProject = { ...proj, ...newProject };
        const currentDate = new Date().toISOString().split('T')[0]; // Data atual no formato ISO
  
        // Inicializa uma lista de alterações
        let changeSummary = "";
        let observacoesAntes = proj.observacoes;
        let observacoesDepois = newProject.observacoes;
        let escopoAntes = proj.escopo;
        let escopoDepois = newProject.escopo;
  
        // Detecta mudanças e as adiciona ao resumo
        if (proj.status !== newProject.status) {
          changeSummary += `Status alterado de "${proj.status}" para "${newProject.status}". `;
        }
        if (proj.estaCom !== newProject.estaCom) {
          changeSummary += `"Está com" alterado de "${proj.estaCom || 'Indefinido'}" para "${newProject.estaCom}". `;
        }
        if (proj.escopo !== newProject.escopo) {
          changeSummary += `Escopo alterado. `;
        }
        if (proj.observacoes !== newProject.observacoes) {
          changeSummary += `Observações atualizadas. `;
        }
  
        // Adiciona ao histórico somente se houver mudanças
        if (changeSummary) {
          updatedProject.historico = [
            ...proj.historico,
            {
              data: currentDate,
              status: newProject.status,
              modificacao: changeSummary.trim(),
              observacoesAnteriores: observacoesAntes,
              observacoesNovas: observacoesDepois,
              escopoAnteriores: escopoAntes,
              escopoNovas: escopoDepois,
            },
          ];
        }
  
        return updatedProject;
      }
      return proj;
    });
  
    setProjects(updatedProjects);
    resetForm();
  };

  // Reset form function
  const resetForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setNewProject({
      cliente: "",
      job: "",
      numeroFuzzr: "",
      gestao: "",
      coordenador: "",
      produtores: "",
      escopo: "",
      observacoes: "",
      dataInicio: "",
      status: "",
      googleDriveLink: ""
    });
  };

  // Filtered and searched projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      Object.values(project).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [projects, searchTerm]);

  // Render Kanban Board View
  const renderKanbanBoard = () => {
    const statuses = ["Kickoff", "PPM", "Online", "Offline", "Finalizado", "Aguardando Retorno", "Stand-By"];

    
    return (
      <div className="grid grid-cols-5 gap-4">
        {statuses.map(status => (
          <div key={status} className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <StatusLED status={status} />
            </h2>
            {filteredProjects
              .filter(project => project.status === status)
              .map(project => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-lg shadow p-4 mb-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{project.job}</h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.googleDriveLink, '_blank');
                        }}
                        className={`text-gray-600 hover:text-blue-500 ${!project.googleDriveLink ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!project.googleDriveLink}
                      >
                        <Link2 size={16} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProject(project);
                        }}
                        className="text-gray-600 hover:text-blue-500"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.cliente}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-semibold">Está com:</span> {project.estaCom || 'Não especificado'}
                  </p>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>{project.produtores}</span>
                    <span>{new Date(project.dataInicio).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            }
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header with View Toggle and Search */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fuzzr Tailor Made</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              type="text"
              placeholder="Buscar projeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded w-full"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              <Filter size={16} />
            </button>
            <button 
              onClick={() => setViewMode('board')}
              className={`p-2 rounded ${viewMode === 'board' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              <Trello size={16} />
            </button>
          </div>
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingProject(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={16} />
            Novo Projeto
          </button>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

<div className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
  <div className="flex gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Data Início</label>
      <input 
        type="date" 
        value={filterStartDate}
        onChange={(e) => setFilterStartDate(e.target.value)}
        className="mt-1 p-2 border rounded w-full"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Data Fim</label>
      <input 
        type="date" 
        value={filterEndDate}
        onChange={(e) => setFilterEndDate(e.target.value)}
        className="mt-1 p-2 border rounded w-full"
      />
    </div>
  </div>
  <div className="flex items-center gap-2">
    <p className="text-lg font-semibold">Projetos no Período:</p>
    <span className="text-xl font-bold text-blue-500">{filteredProjectsByPeriod.length}</span>
  </div>
</div>

      {/* Form for New/Edit Project */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <form onSubmit={editingProject ? handleUpdateProject : handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              value={newProject.cliente}
              onChange={(e) => setNewProject({...newProject, cliente: e.target.value})}
              className="p-2 border rounded" 
              placeholder="Cliente" 
              required
            />
            <input 
              value={newProject.job}
              onChange={(e) => setNewProject({...newProject, job: e.target.value})}
              className="p-2 border rounded" 
              placeholder="Job" 
              required
            />
            <input 
              value={newProject.numeroFuzzr}
              onChange={(e) => setNewProject({...newProject, numeroFuzzr: e.target.value})}
              className="p-2 border rounded" 
              placeholder="Número Fuzzr" 
              required
            />
            <input 
              value={newProject.googleDriveLink}
              onChange={(e) => setNewProject({...newProject, googleDriveLink: e.target.value})}
              className="p-2 border rounded" 
              placeholder="Link do Google Drive" 
            />
            <input 
              value={newProject.gestao}
              onChange={(e) => setNewProject({...newProject, gestao: e.target.value})}
              className="p-2 border rounded" 
              placeholder="Gestão do Projeto" 
            />
            <input 
              value={newProject.coordenador}
              onChange={(e) => setNewProject({...newProject, coordenador: e.target.value})}
              className="p-2 border rounded" 
              placeholder="Coordenador" 
            />
            <input 
              value={newProject.produtores}
              onChange={(e) => setNewProject({...newProject, produtores: e.target.value})}
              className="p-2 border rounded" 
              placeholder="Produtores" 
            />
            <select 
              value={newProject.estaCom}
              onChange={(e) => setNewProject({...newProject, estaCom: e.target.value})}
              className="p-2 border rounded"
              required
            >
              <option value="">Selecione quem está com o projeto</option>
              <option value="Fuzzr">Fuzzr</option>
              <option value="Cliente">Cliente</option>
            </select>
            <textarea 
              value={newProject.escopo}
              onChange={(e) => setNewProject({...newProject, escopo: e.target.value})}
              className="p-2 border rounded col-span-2"
              placeholder="Escopo Resumido Job"
              rows={3}
            />
            <textarea 
              value={newProject.observacoes}
              onChange={(e) => setNewProject({...newProject, observacoes: e.target.value})}
              className="p-2 border rounded col-span-2"
              placeholder="Observações do Projeto"
              rows={2}
            />
            <input 
              type="date" 
              value={newProject.dataInicio}
              onChange={(e) => setNewProject({...newProject, dataInicio: e.target.value})}
              className="p-2 border rounded" 
              required
            />
            <select 
              value={newProject.status}
              onChange={(e) => setNewProject({...newProject, status: e.target.value})}
              className="p-2 border rounded" 
              required
            >
              <option value="">Selecione o Status</option>
              <option value="Kickoff">Kickoff</option>
              <option value="PPM">PPM</option>
              <option value="Aguardando Retorno">Aguardando Retorno</option>
              <option value="Stand-By">Stand-By</option>
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
              <option value="Finalizado">Finalizado</option>
            </select>
            <div className="col-span-2 flex gap-2">
              <button 
                type="submit" 
                className="flex-grow bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
              >
                {editingProject ? <><Save size={16} /> Atualizar</> : <><Plus size={16} /> Salvar</>}
              </button>
              {editingProject && (
                <button 
                  type="button"
                  onClick={resetForm}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Render either Table or Kanban Board */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número Fuzzr</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Início</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Está com</th> {/* Nova coluna */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjectsByPeriod.map(project => (
                <tr 
                  key={project.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{project.numeroFuzzr}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{project.cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{project.job}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(project.dataInicio).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusLED status={project.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{project.estaCom}</td> {/* Exibe quem está com o projeto */}
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.googleDriveLink, '_blank');
                      }}
                      className={`text-gray-600 hover:text-blue-500 ${!project.googleDriveLink ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!project.googleDriveLink}
                    >
                      <Link2 size={16} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProject(project);
                      }}
                      className="text-gray-600 hover:text-blue-500"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        renderKanbanBoard(filteredProjectsByPeriod)
      )}
    </div>
  );
};

export default ProjectDashboard;