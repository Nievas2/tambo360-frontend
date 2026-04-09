import Link from 'next/link'

const Nosotros = () => {
  return (
    <section className="w-full bg-[#e8eaed] py-20 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-5">
          <h2 className="text-4xl font-bold text-gray-900">
            Liderando la Digitalización del Agro
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Tambo360 nació con un objetivo claro: devolver el control total de
            la gestión a quienes trabajan en el campo. Detectamos el desgaste de
            una administración analógica y fragmentada; planillas que se pierden
            o se vuelven ilegibles por el rigor del trabajo diario, provocando
            pérdidas invisibles. La falta de claridad en las mermas y de
            indicadores económicos para decisiones de inversión impacta
            directamente en la rentabilidad. Por eso, creamos una herramienta
            que garantiza una transición digital sin fricciones.
          </p>
        </div>

        {/* Right: Image */}
        <div>
          <img
            src="/vacas_5.webp"
            alt="Vacas en el tambo"
            className="w-full rounded-2xl object-cover shadow-sm"
          />
        </div>
      </div>
    </section>
  )
}

export default Nosotros
