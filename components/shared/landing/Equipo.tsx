const team = [
  {
    name: 'Lorena P. Sartori',
    role: 'Project Manager',
    avatar: '/lorenasartori.webp',
  },
  {
    name: 'Gabriel Nievas',
    role: 'Frontend Developer',
    avatar: '/gabrielnievas.webp',
  },
  {
    name: 'Ornella Meolans',
    role: 'Frontend Developer',
    avatar: '/ornellameolans.webp',
  },
  {
    name: 'Cintia Duarte',
    role: 'Diseñadora UX/UI',
    avatar: 'https://i.pravatar.cc/150?img=52',
  },
  {
    name: 'Nicolas Mansilla',
    role: 'Diseñador UX/UI',
    avatar: 'https://i.pravatar.cc/150?img=53',
  },
  {
    name: 'Facundo Fernandez',
    role: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?img=35',
  },
  {
    name: 'Nicolas De Bella',
    role: 'Backend Developer',
    avatar: '/nicolasdebella.webp',
  },
  {
    name: 'Juan Ignacio Meza Wakahayashi',
    role: 'Backend Developer',
    avatar: '/juanmeza.webp',
  },
  {
    name: 'Nicolas Pavon',
    role: 'QA Engineer',
    avatar: '/nicolaspavon.webp',
  },
  {
    name: 'Tatiana Tablada',
    role: 'QA Engineer',
    avatar: '/tatianatablada.webp',
  },
  {
    name: 'Eliana Proserpio',
    role: 'QA Engineer',
    avatar: '/elianaproserpio.webp',
  },
]

const Equipo = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#3a7d1e] uppercase tracking-wide mb-4">
            Nuestro equipo interdisciplinario
          </h2>
          <p className="text-gray-500 text-base">
            Ofrecemos Ingeniería de software con visión de negocio aplicada al
            agro.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover grayscale"
              />
              <div>
                <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Equipo
