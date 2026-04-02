import Link from 'next/link'

const Nosotros = () => {
  return (
    <section className="w-full bg-[#f0f4ef] py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-[#3a7d1e] uppercase tracking-wide mb-3">
              Quiénes Somos
            </h2>
            <div className="w-10 h-1 bg-[#3a7d1e] rounded-full" />
          </div>

          <div className="flex flex-col gap-4 text-gray-700 text-base leading-relaxed">
            <p>
              Tambo360 nació con un objetivo claro: devolver el control total de
              la gestión a quienes trabajan en el campo. Detectamos el desgaste
              de una administración analógica y fragmentada; planillas que se
              pierden o se vuelven ilegibles por el rigor del trabajo diario,
              provocando pérdidas invisibles. La falta de claridad en las mermas
              y de indicadores económicos para decisiones de inversión impacta
              directamente en la rentabilidad. Por eso, creamos una herramienta
              que garantiza una transición digital sin fricciones.
            </p>
          </div>

          <Link
            href="/contacto"
            className="w-fit bg-[#3a7d1e] hover:bg-[#2e6518] text-white font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-lg transition-colors duration-200"
          >
            Probar Tambo360
          </Link>
        </div>

        {/* Right: Image */}
        <div className="relative">
          {/* Shadow card behind image */}
          <div className="absolute bottom-0 right-0 w-[92%] h-[92%] bg-gray-200 rounded-2xl" />
          <img
            src="/cow.jpg"
            alt="Vaca lechera en el campo"
            className="relative z-10 w-full rounded-2xl object-cover shadow-sm"
          />
        </div>
      </div>
    </section>
  )
}

export default Nosotros
