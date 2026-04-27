const team = [
  {
    name: 'Lorena P. Sartori',
    role: 'Project Manager',
    avatar: '/team/lorenasartori.webp',
    className: 'w-24 h-24 rounded-full object-cover object-top grayscale',
    description: '"Simplifico el software para que sea útil en tu día a día."',
  },
  {
    name: 'Gabriel Nievas',
    role: 'Frontend Developer',
    avatar: '/team/gabrielnievas.webp',
    description: '"Traduzco tus datos en gráficos para tomar decisiones."',
  },
  /*   {
    name: 'Ornella Meolans',
    role: 'Frontend Developer',
    avatar: '/team/ornellameolans.webp',
    description: '"Optimizo la app para que registres tus lotes al instante."',
  }, */
  {
    name: 'Cintia Duarte',
    role: 'Diseñadora UX/UI',
    avatar: '/team/cintiaduarte.webp',
    description: '"Simplifico el software para que sea útil en tu día a día."',
  },
  /*   {
    name: 'Nicolas Mansilla',
    role: 'Diseñador UX/UI',
    avatar: '/team/nicolasmansilla.webp',
    description:
      '"Ordeno la información para que encuentres todo sin vueltas." ',
  }, */
  {
    name: 'Facundo Fernandez',
    role: 'Backend Developer',
    avatar: '/team/facundofernandez.webp',
    description:
      '"Desarrollo la IA que analiza tus mermas y te envía alertas."',
  },
  {
    name: 'Nicolas De Bella',
    role: 'Backend Developer',
    avatar: '/team/nicolasdebella.webp',
    className: 'w-24 h-24 rounded-full object-cover object-top grayscale',
    description: '"Programo el motor que anticipa problemas en tiempo real."',
  },
  {
    name: 'Juan Ignacio Meza Wakahayashi',
    role: 'Backend Developer',
    avatar: '/team/juanmeza.webp',
    description: '"Aseguro que tu Modo Offline funcione siempre sin señal."',
  },
  {
    name: 'Nicolas Pavon',
    role: 'QA Engineer',
    avatar: '/team/nicolaspavon.webp',
    description: '"Pruebo cada función para que la app sea siempre confiable."',
  },
  /*   {
    name: 'Tatiana Tablada',
    role: 'QA Engineer',
    avatar: '/team/tatianatablada.webp',
    description: '"Verifico que tus cálculos de costos y mermas sean exactos."',
  },
  {
    name: 'Eliana Proserpio',
    role: 'QA Engineer',
    avatar: '/team/elianaproserpio.webp',
    description:
      '"Valido que las alertas funcionen como vos necesitás en el campo."',
  }, */
]

const Equipo = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide mb-4">
            Nuestro equipo interdisciplinario
          </h2>
          <p className="text-gray-500 text-base">
            Ofrecemos Software de Gestión Agrícola (SaaS) con visión de negocio.
            Un equipo online desarrollando tecnología para el campo.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-center">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className={`${member.className || 'w-24 h-24 rounded-full object-cover object-center grayscale'}`}
              />
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                <p className="text-green-main font-bold text-sm">
                  {member.role}
                </p>
                <p className="text-body-text text-xs">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Equipo
