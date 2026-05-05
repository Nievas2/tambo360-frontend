import { ChevronRight, MapPin, Minus, Plus } from 'lucide-react'

const Configuration = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Encabezado */}
        <header className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold text-slate-900">
              Configura tu Perfil
            </h1>
            <span className="bg-emerald-600 text-white text-[10px] px-3 py-1 rounded-full">
              Invitación
            </span>
          </div>
          <p className="text-slate-500 text-lg">
            Ayudanos a personalizar la experiencia de Tambo360 con los datos
            actuales de tu establecimiento
          </p>
        </header>

        <form className="flex flex-col gap-12">
          {/* 1. Cantidad de Vacas */}
          <section className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-700">
              1. ¿Cuántas vacas tenés en ordeñe hoy?
            </label>
            <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center h-14">
              <button
                type="button"
                className="h-full px-4 bg-slate-300 text-slate-600 rounded-lg hover:bg-slate-400 transition-colors"
              >
                <Minus size={20} />
              </button>
              <input
                type="text"
                defaultValue="100"
                className="h-full border-2 border-lime-200 rounded-lg text-center font-bold text-xl outline-none focus:border-lime-500"
              />
              <button
                type="button"
                className="h-full px-4 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </section>

          {/* 2. Raza Predominante */}
          <section className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-700">
              2. ¿Qué raza predominante manejás?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Holando', 'Jersey', 'Cruza', 'Pardo Suizo', 'Guernsey'].map(
                (raza) => (
                  <button
                    key={raza}
                    type="button"
                    className={`p-4 rounded-xl border-2 text-center font-medium transition-all ${raza === 'Holando' ? 'border-lime-500 bg-white shadow-sm' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
                  >
                    {raza}
                  </button>
                )
              )}
              <button
                type="button"
                className="p-4 rounded-xl border-2 border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-50"
              >
                <Plus size={24} />
              </button>
            </div>
          </section>

          {/* 3. Frecuencia de Ordeñe */}
          <section className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-700">
              3. ¿Cuántas veces al día ordeñás?
            </label>
            <div className="flex gap-8">
              {['1 vez', '2 veces', '3 veces'].map((opcion) => (
                <label
                  key={opcion}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    name="ordeñe-frec"
                    className="w-4 h-4 accent-emerald-600"
                  />
                  {opcion}
                </label>
              ))}
            </div>
          </section>

          {/* 4. Tipo de Ordeñe */}
          <section className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-700">
              4. ¿Qué tipo de ordeñe usás?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Balde',
                'Línea',
                'Espina de pescado',
                'Rotativo',
                'Manual',
                'Otro',
              ].map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  className={`p-4 rounded-xl border font-medium transition-all ${tipo === 'Balde' ? 'bg-emerald-200 border-emerald-300 text-emerald-900' : 'bg-white border-slate-200 text-slate-500 shadow-sm'}`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </section>

          {/* 5. Producción Diaria */}
          <section className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-700">
              5. ¿Cuántos litros producís en promedio por día?
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="000"
                className="w-full p-4 border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 bg-slate-50/50"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                LTS
              </span>
            </div>
          </section>

          {/* 7. Empleados y Plan (Layout Complejo) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-slate-700">
                7. ¿Tenés empleados que cargarían datos?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 rounded-xl border border-slate-200 flex items-center gap-3 text-sm font-medium">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300" />{' '}
                  No, solo yo
                </button>
                <button className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-100 flex items-center justify-between text-sm font-medium">
                  Sí, tengo empleados
                  <div className="w-4 h-4 rounded-full bg-emerald-600" />
                </button>
              </div>
            </div>

            {/* Plan Sugerido Card */}
            <div className="bg-emerald-200/60 p-4 rounded-xl border border-emerald-300 flex flex-col gap-3">
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                Plan Sugerido
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-emerald-900">
                  Plan Equipo/Multi
                </span>
                <div className="flex items-center gap-4 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                  <Minus size={14} />
                  <span className="font-bold">5</span>
                  <Plus size={14} />
                </div>
              </div>
              <p className="text-[10px] text-emerald-700 text-right">
                Número de empleados
              </p>
            </div>
          </section>

          {/* 8. Ubicación */}
          <section className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-700">
              8. ¿Dónde está tu tambo?
            </label>
            <div className="w-full p-8 border-2 border-slate-100 bg-white rounded-2xl flex justify-center items-center shadow-sm">
              <button
                type="button"
                className="bg-lime-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-bold text-sm hover:bg-lime-800"
              >
                <MapPin size={18} /> Detectar GPS
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500">
                  Provincia
                </label>
                <select className="p-3 border border-slate-200 rounded-lg bg-white text-sm outline-none">
                  <option>Seleccione una</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500">
                  Localidad
                </label>
                <select className="p-3 border border-slate-200 rounded-lg bg-white text-sm outline-none">
                  <option>Seleccione una</option>
                </select>
              </div>
            </div>
          </section>

          {/* Footer de Navegación */}
          <footer className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-100">
            <div className="flex gap-4">
              <button className="px-12 py-4 bg-emerald-200 text-emerald-800 font-bold rounded-xl hover:bg-emerald-300 transition-all">
                Atrás
              </button>
              <button className="px-12 py-4 bg-white border border-slate-200 text-emerald-800 font-bold rounded-xl hover:bg-slate-50 transition-all">
                Omitir
              </button>
            </div>
            <div className="flex gap-4">
              <button className="px-12 py-4 bg-white border-2 border-lime-600 text-lime-700 font-bold rounded-xl hover:bg-lime-50 transition-all">
                Aceptar
              </button>
              <button className="px-12 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 flex items-center gap-2 transition-all">
                Siguiente <ChevronRight size={20} />
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  )
}
export default Configuration
