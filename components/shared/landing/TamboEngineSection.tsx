const TamboEngineSection = () => {
  return (
    <section className="px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img
              src="/landing/tambo-engine.webp"
              alt="dashboard-produccion-lechera"
              className="w-full rounded-xl"
            />
          </div>
          <div className="flex flex-col items-start w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-[#0B1001] mb-4">
              TamboEngine: Inteligencia Artificial que se anticipa al problema
            </h2>
            <p className="text-lg text-[#475569]">
              TamboEngine supervisa tu producción láctea en tiempo real para
              detectar desvíos antes de que sean un problema. Transforma datos
              complejos en alertas simples mediante IA, permitiéndote optimizar
              la gestión operativa, asegurar el bienestar animal y evitar que
              una pequeña merma afecte tu rentabilidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default TamboEngineSection
