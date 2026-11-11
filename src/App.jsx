import React, { useState, useEffect } from 'react';
import { Heart, Wind, Leaf, ArrowRight, Phone, Mail, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

// --- COMPONENTES VISUALES ---

// Mascota "Lumi" - Un pequeño espíritu/nube de calma
const Lumi = ({ className = "w-16 h-16" }) => (
  <div className={`relative animate-float ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M85 55C85 68.8071 73.8071 80 60 80H40C26.1929 80 15 68.8071 15 55C15 45.4741 20.3235 37.1906 28.2575 33.0094C29.6231 23.3855 37.915 16 48 16C59.0457 16 68 24.9543 68 36C68 36.1953 67.9972 36.3899 67.9917 36.5837C77.4475 38.6477 85 46.1042 85 55Z" fill="#F4F7F5" stroke="#B5C9B8" strokeWidth="3"/>
      {/* Ojos */}
      <circle cx="40" cy="50" r="4" fill="#7A9382"/>
      <circle cx="60" cy="50" r="4" fill="#7A9382"/>
      {/* Sonrisa */}
      <path d="M45 58C45 58 48 62 50 62C52 62 55 58 55 58" stroke="#7A9382" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Mejillas */}
      <ellipse cx="32" cy="55" rx="5" ry="3" fill="#D1C8E1" opacity="0.6"/>
      <ellipse cx="68" cy="55" rx="5" ry="3" fill="#D1C8E1" opacity="0.6"/>
    </svg>
  </div>
);

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  
  // Estados de recopilación de datos de la sesión (se borran al reiniciar)
  const [userName, setUserName] = useState('');
  const [emotionIntensity, setEmotionIntensity] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [situation, setSituation] = useState('');
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [microStep, setMicroStep] = useState('');

  const situations = [
    "Recibiste la nota de un parcial decisivo y es mucho más baja de lo que esperabas, poniendo en riesgo la materia.",
    "Estás en medio de una exposición frente a toda la clase y de repente tu mente se queda completamente en blanco.",
    "Cometiste un error importante en una entrega grupal y sientes que afectaste el trabajo de todos tus compañeros.",
    "Olvidaste por completo la fecha de entrega de un trabajo importante y el plazo ya se cerró.",
    "Sientes el 'Síndrome del Impostor': crees que no eres lo suficientemente bueno para estar en tu carrera y que pronto todos se darán cuenta.",
    "Tienes tantas tareas, lecturas y trabajos acumulados que no sabes por dónde empezar y te sientes totalmente paralizado/a."
  ];

  const emotionsList = ['Miedo', 'Frustración', 'Enojo', 'Tristeza', 'Agobio', 'Culpa'];

  // Asignar situación aleatoria al llegar al paso correspondiente (Paso 4)
  useEffect(() => {
    if (currentStep === 4 && !situation) {
      setSituation(situations[Math.floor(Math.random() * situations.length)]);
    }
  }, [currentStep, situation]);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
    try {
      window.scrollTo({top: 0, behavior: 'smooth'});
    } catch (e) {
      // Ignorar si el entorno no soporta scrollTo
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setUserName('');
    setEmotionIntensity(5);
    setSelectedEmotion('');
    setSituation('');
    setSelectedReaction(null);
    setMicroStep('');
    try {
      window.scrollTo({top: 0, behavior: 'smooth'});
    } catch (e) {
      // Ignorar si el entorno no soporta scrollTo
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-slate-700 font-sans relative overflow-x-hidden flex flex-col selection:bg-[#c1d3c4] selection:text-slate-800">
      {/* CSS Global mejorado */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes smoothBreathe {
          0% { transform: scale(1); background-color: #B9CACC; }
          33% { transform: scale(1.6); background-color: #B5C9B8; }
          66% { transform: scale(1.6); background-color: #B5C9B8; }
          100% { transform: scale(1); background-color: #B9CACC; }
        }
        .animate-smooth-breathe {
          animation: smoothBreathe 12s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.06);
        }
        /* Custom range slider */
        input[type=range] {
          -webkit-appearance: none; 
          width: 100%; 
          background: transparent; 
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px; width: 24px;
          border-radius: 50%;
          background: #8FA896;
          cursor: pointer;
          margin-top: -10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%; height: 6px;
          cursor: pointer;
          background: #E8F0EA;
          border-radius: 10px;
        }
      `}</style>

      {/* Fondos abstractos calmantes */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E8F0EA] blur-[100px] opacity-70 pointer-events-none transition-all duration-1000"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#EAE8F0] blur-[100px] opacity-60 pointer-events-none transition-all duration-1000"></div>
      <div className="fixed top-[20%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-[#F0EBE8] blur-[80px] opacity-50 pointer-events-none transition-all duration-1000"></div>

      {/* Botones Flotantes Permanentes */}
      <button 
        onClick={() => setIsSOSOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-[#8FA896]/95 backdrop-blur-md text-white py-3 px-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-[#7A9382] transition-all duration-500 flex items-center justify-center gap-2 group"
      >
        <Wind className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium text-sm">Pausa SOS</span>
      </button>

      <button 
        onClick={() => setIsSupportModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-md text-[#7A9382] py-3 px-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white transition-all duration-500 flex items-center justify-center gap-2 border border-[#E8F0EA] group"
      >
        <Heart className="w-5 h-5 group-hover:scale-110 transition-transform text-[#9CB3A3]" fill="currentColor" />
        <span className="font-medium text-sm">Apoyo EAN</span>
      </button>

      {/* Modal de Apoyo Institucional */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/15 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm p-8 relative border border-[#E8F0EA]">
            <button onClick={() => setIsSupportModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-slate-50">✕</button>
            <div className="w-14 h-14 bg-[#F0F4F1] rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-[#7A9382]" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">Líneas de Apoyo EAN</h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              No tienes que pasar por esto solo/a. El equipo de Bienestar está listo para escucharte de forma confidencial.
            </p>
            <div className="space-y-3">
              <a href="mailto:bienestar@ean.edu.co" className="flex items-center gap-4 p-4 bg-[#F4F7F5] rounded-2xl hover:bg-[#E8F0EA] transition-colors group">
                <Mail className="w-5 h-5 text-[#8FA896]" />
                <span className="text-slate-700 font-medium">bienestar@ean.edu.co</span>
              </a>
              <div className="flex items-center gap-4 p-4 bg-[#F4F7F5] rounded-2xl hover:bg-[#E8F0EA] transition-colors group cursor-pointer">
                <Phone className="w-5 h-5 text-[#8FA896]" />
                <span className="text-slate-700 font-medium">(601) 593 6464</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#F4F7F5] rounded-2xl">
                <MapPin className="w-5 h-5 text-[#8FA896]" />
                <span className="text-slate-700 font-medium text-sm">Oficina de Bienestar Universitario</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenedor Principal */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 w-full max-w-2xl mx-auto min-h-screen relative z-10 py-20">
        <div className="w-full">
          
          {/* PASO 1: Bienvenida e Identificación */}
          {currentStep === 1 && (
            <div className="glass-card rounded-[2.5rem] p-10 sm:p-14 animate-fade-in flex flex-col items-center relative text-center">
              <Lumi className="w-24 h-24 mb-6" />
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4 tracking-tight leading-tight">
                Tropezar también es <span className="text-[#8FA896]">avanzar</span>.
              </h1>
              <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                Hola, soy Lumi. Este es un espacio seguro, anónimo y sin juicios para tomar un respiro cuando la universidad se vuelve pesada.
              </p>
              
              <div className="w-full max-w-xs mb-8">
                <label className="block text-sm font-medium text-slate-600 mb-2">¿Cómo te gustaría que te llame?</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Escribe tu nombre o apodo..."
                  className="w-full px-5 py-4 bg-white/60 border border-[#E8F0EA] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8FA896] text-center text-lg text-slate-700 placeholder-slate-400 transition-all shadow-sm"
                  maxLength={15}
                />
              </div>

              <button 
                onClick={handleNext}
                disabled={!userName.trim()}
                className={`text-white text-lg font-medium py-4 px-10 rounded-full shadow-lg transition-all flex items-center gap-3 ${userName.trim() ? 'bg-[#9CB3A3] hover:bg-[#8FA896] hover:scale-105 shadow-[#9CB3A3]/20' : 'bg-slate-300 cursor-not-allowed'}`}
              >
                Comenzar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* PASO 2: Propósito y Primera Respiración */}
          {currentStep === 2 && (
            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 animate-fade-in text-center relative overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] opacity-30 pointer-events-none">
                 <Lumi className="w-32 h-32" />
              </div>
              <h2 className="text-3xl font-semibold text-slate-800 mb-6 relative z-10">
                Bienvenido/a, {userName}
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-lg mx-auto relative z-10">
                Antes de continuar, te invito a tomar una <strong>respiración muy profunda</strong>. Suelta los hombros y relaja la mandíbula un momento.
              </p>
              <div className="bg-white/70 p-6 rounded-2xl border border-[#E8F0EA] mb-10 max-w-lg mx-auto text-left shadow-sm relative z-10">
                <h3 className="font-medium text-[#7A9382] mb-3 flex items-center gap-2 text-lg">
                  <Wind className="w-5 h-5" /> Nuestro propósito aquí
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Esta cabina interactiva no es una evaluación ni un tratamiento clínico. Es tu "botiquín de primeros auxilios emocionales".
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Está diseñada para ayudarte a entender cómo reaccionas ante la presión universitaria y brindarte herramientas muy rápidas para recuperar la calma cuando sientas frustración o miedo al fracaso.
                </p>
              </div>
              <button
                onClick={handleNext}
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-8 rounded-full transition-all inline-flex items-center gap-3 shadow-lg hover:-translate-y-0.5 relative z-10"
              >
                Inhalar y avanzar <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PASO 3: Termómetro Emocional */}
          {currentStep === 3 && (
            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <Lumi className="w-16 h-16 shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">Hola, {userName}.</h2>
                  <p className="text-slate-500">Vamos a revisar cómo te sientes en este momento.</p>
                </div>
              </div>

              <div className="mb-10 bg-white/50 p-6 rounded-[2rem] border border-white">
                <label className="block text-lg font-medium text-slate-700 mb-6 text-center">
                  ¿Qué tan intensa es tu emoción ahora mismo?
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={emotionIntensity}
                  onChange={(e) => setEmotionIntensity(e.target.value)}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-slate-400 font-medium px-1">
                  <span>1 (Leve)</span>
                  <span className="text-[#8FA896] font-bold text-lg">{emotionIntensity}</span>
                  <span>10 (Abrumador)</span>
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-lg font-medium text-slate-700 mb-4 text-center">
                  Si tuvieras que ponerle un nombre, ¿qué sientes?
                </label>
                <div className="flex flex-wrap justify-center gap-3">
                  {emotionsList.map(emotion => (
                    <button
                      key={emotion}
                      onClick={() => setSelectedEmotion(emotion)}
                      className={`px-5 py-2.5 rounded-full border transition-all text-base ${selectedEmotion === emotion ? 'bg-[#8FA896] text-white border-[#8FA896] shadow-md' : 'bg-white text-slate-600 border-[#E8F0EA] hover:border-[#8FA896]/50 hover:bg-[#F4F7F5]'}`}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNext}
                  disabled={!selectedEmotion}
                  className={`py-3 px-8 rounded-full font-medium transition-all flex items-center gap-2 ${selectedEmotion ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  Siguiente paso <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 4: Situación Aleatoria y Reacción Instintiva */}
          {currentStep === 4 && (
            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 animate-fade-in">
               <div className="flex gap-4 mb-8 items-start">
                <Lumi className="w-12 h-12 shrink-0 mt-1" />
                <div>
                  <span className="inline-block py-1 px-3 bg-[#D1C8E1]/30 text-[#8473A8] rounded-full text-xs font-bold tracking-wide uppercase mb-3">
                    Ejercicio de Visualización
                  </span>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    A veces el <strong className="text-slate-800">{selectedEmotion.toLowerCase()}</strong> nos hace reaccionar en automático. Imagina esta situación por un segundo:
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8F0EA] shadow-sm mb-8">
                <h3 className="text-xl font-medium text-slate-800 leading-relaxed italic">
                  "{situation}"
                </h3>
              </div>
              
              <h4 className="text-center text-slate-500 mb-6 font-medium">
                ¿Qué harías instintivamente en ese primer segundo?
              </h4>

              <div className="space-y-3">
                {[
                  { id: 'flight', text: "Huir o evitar: Ignoro el tema, cierro todo, me distraigo con el celular para no pensar en ello." },
                  { id: 'internalize', text: "Internalizar: Me culpo de inmediato, me digo que no soy suficiente o que soy un fracaso." },
                  { id: 'fight', text: "Luchar (Enojo): Me frustro muchísimo, me da rabia, busco culpables o lloro de impotencia." },
                  { id: 'freeze', text: "Parálisis: Me quedo en blanco, me bloqueo, no sé qué hacer y no hago nada." }
                ].map((reaction) => (
                  <button 
                    key={reaction.id}
                    onClick={() => {
                      setSelectedReaction(reaction.id);
                      handleNext();
                    }}
                    className="w-full text-left p-5 rounded-2xl bg-white/60 border border-[#E8F0EA] hover:border-[#8FA896] hover:bg-white hover:shadow-md transition-all text-slate-600 hover:text-slate-800"
                  >
                    <span className="block text-base leading-relaxed">{reaction.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASO 5: Estación de Calma 1 - Respiración */}
          {currentStep === 5 && (
            <div className="animate-fade-in">
              <div className="glass-card rounded-[2rem] p-6 mb-6 flex items-center gap-4">
                <Lumi className="w-14 h-14 shrink-0" />
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Es completamente normal que tu instinto sea esa reacción, {userName}. Cuando la emoción es de <strong>nivel {emotionIntensity}</strong>, nuestro cerebro busca protegernos. Pero antes de actuar, vamos a darle oxígeno a tus pensamientos.
                </p>
              </div>

              <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden">
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">Primera parada: Respiración</h3>
                <p className="text-slate-500 mb-12">Sigue el ritmo de mi círculo de luz. Inhala cuando crezca.</p>
                
                <BreathingExercise onComplete={handleNext} />
              </div>
            </div>
          )}

          {/* PASO 6: Estación de Calma 2 - Grounding (5-4-3-2-1) */}
          {currentStep === 6 && (
            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 animate-fade-in flex flex-col min-h-[500px]">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">Segunda parada: Volver al aquí y ahora</h3>
                <p className="text-slate-500">
                  La ansiedad nos lleva al futuro, la culpa al pasado. Vamos a traer tu mente al presente, {userName}.
                </p>
              </div>
              
              <div className="flex-grow flex items-center justify-center">
                <GroundingExercise onComplete={handleNext} />
              </div>
            </div>
          )}

          {/* PASO 7: Reflexión Guiada (4 Pasos) */}
          {currentStep === 7 && (
            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 animate-fade-in">
               <div className="flex items-center gap-4 mb-8">
                <Lumi className="w-16 h-16 shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
                  ¿Cómo procesamos este tropiezo?
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-5 mb-10">
                <div className="flex gap-5 p-5 rounded-2xl bg-white border border-[#E8F0EA]">
                  <div className="w-10 h-10 rounded-full bg-[#E8F0EA] text-[#7A9382] flex items-center justify-center font-bold text-lg shrink-0">1</div>
                  <div>
                    <h4 className="font-medium text-slate-800 text-lg mb-1">Acepta tu {selectedEmotion.toLowerCase()}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">No trates de suprimirla. Es válido sentir que todo salió mal. Date permiso de sentirte así por un momento, sin juzgarte.</p>
                  </div>
                </div>
                
                <div className="flex gap-5 p-5 rounded-2xl bg-white border border-[#E8F0EA]">
                  <div className="w-10 h-10 rounded-full bg-[#E8F0EA] text-[#7A9382] flex items-center justify-center font-bold text-lg shrink-0">2</div>
                  <div>
                    <h4 className="font-medium text-slate-800 text-lg mb-1">Separa el error de tu identidad</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Tropezar en la universidad es un evento, no una definición de quién eres. Perder una nota no significa que no seas inteligente o capaz.</p>
                  </div>
                </div>

                <div className="flex gap-5 p-5 rounded-2xl bg-white border border-[#E8F0EA]">
                  <div className="w-10 h-10 rounded-full bg-[#E8F0EA] text-[#7A9382] flex items-center justify-center font-bold text-lg shrink-0">3</div>
                  <div>
                    <h4 className="font-medium text-slate-800 text-lg mb-1">Busca el dato útil</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Detrás de cada equivocación hay información. ¿Te faltó tiempo? ¿No entendiste el tema? ¿Te ganaron los nervios? Ese es tu aprendizaje.</p>
                  </div>
                </div>
                
                <div className="flex gap-5 p-5 rounded-2xl bg-white border border-[#E8F0EA]">
                  <div className="w-10 h-10 rounded-full bg-[#B5C9B8] text-white flex items-center justify-center font-bold text-lg shrink-0">4</div>
                  <div>
                    <h4 className="font-medium text-slate-800 text-lg mb-1">Define un micro-paso</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">No intentes arreglar todo hoy. Solo piensa en una pequeña acción minúscula que te devuelva un poquito de control.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNext}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-8 rounded-full transition-all flex items-center gap-2"
                >
                  Estoy listo/a para el último paso <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 8: Plan de Acción y Despedida (Recomendaciones de autocuidado) */}
          {currentStep === 8 && (
            <div className="glass-card rounded-[3rem] p-10 sm:p-14 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                 <Lumi className="w-40 h-40" />
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mb-4 relative z-10">
                Tu compromiso de autocuidado
              </h2>
              <p className="text-slate-600 mb-8 relative z-10">
                Escribe esa acción minúscula (micro-paso) que harás después de cerrar esta pestaña, {userName}. Si tu nivel de estrés aún es alto, tu paso puede ser simplemente "Dormir" o "Tomar agua".
              </p>
              
              <div className="mb-8 relative z-10">
                <textarea 
                  value={microStep}
                  onChange={(e) => setMicroStep(e.target.value)}
                  className="w-full p-6 rounded-2xl bg-white border-2 border-[#E8F0EA] text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#8FA896]/20 focus:border-[#8FA896] resize-none shadow-sm transition-all text-lg"
                  rows="3"
                  placeholder="Ej: Le escribiré un correo honesto al profesor, revisaré un solo apunte, o saldré a caminar 10 minutos."
                ></textarea>
              </div>

              {/* BLOQUE DE AUTOCUIDADO AGREGADO */}
              <div className="bg-[#F4F7F5] p-6 rounded-2xl mb-10 relative z-10 border border-[#E8F0EA]">
                <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-[#8FA896]"/> Recomendaciones para ahora mismo:
                </h4>
                <ul className="text-slate-600 text-sm space-y-2 mb-4">
                  <li className="flex items-center gap-2">💧 Bebe un vaso de agua fresca.</li>
                  <li className="flex items-center gap-2">👀 Aleja la vista de las pantallas por un momento.</li>
                  <li className="flex items-center gap-2">🚶 Estira tu cuerpo o da un pequeño paseo por la casa/campus.</li>
                </ul>
                <div className="flex items-start gap-4 pt-4 border-t border-slate-200">
                  <CheckCircle2 className="w-8 h-8 text-[#8FA896] shrink-0 mt-0.5" />
                  <p className="text-slate-700 leading-relaxed font-medium text-sm">
                    "Equivocarte no define tu valor. Lo que importa es cómo decides levantarte. Recuerda que no tienes que cargar con todo tú solo/a."
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <button 
                  onClick={handleNext}
                  className="w-full sm:w-auto bg-[#8FA896] hover:bg-[#7A9382] text-white text-lg font-medium py-4 px-10 rounded-full shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Wind className="w-5 h-5" /> Salir de la cabina en calma
                </button>
                <button 
                  onClick={() => setIsSupportModalOpen(true)}
                  className="w-full sm:w-auto text-slate-500 hover:text-slate-800 font-medium py-4 px-8 rounded-full transition-colors bg-white hover:bg-slate-50 border border-slate-200"
                >
                  Ver contactos de apoyo EAN
                </button>
              </div>
            </div>
          )}

          {/* PASO 9: Pantalla Final de Cierre Total */}
          {currentStep === 9 && (
            <div className="text-center animate-fade-in flex flex-col items-center justify-center h-[60vh]">
              <Lumi className="w-28 h-28 mb-8" />
              <h2 className="text-3xl sm:text-4xl font-medium text-[#7A9382] mb-6">
                Has completado tu espacio de calma.
              </h2>
              <p className="text-slate-500 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                Ya puedes cerrar esta pestaña y continuar con tu día a tu propio ritmo. Que tengas un momento muy tranquilo, {userName}.
              </p>
              <button 
                onClick={handleRestart}
                className="text-slate-400 hover:text-slate-600 underline text-sm transition-colors"
              >
                Volver a empezar la experiencia
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Overlay SOS de Emergencia a pantalla completa */}
      {isSOSOpen && <SOSOverlay onClose={() => setIsSOSOpen(false)} userName={userName} />}
    </div>
  );
}

// --- SUBCOMPONENTES ---

function GroundingExercise({ onComplete }) {
  const steps = [
    { num: 5, label: "cosas que puedas VER a tu alrededor", icon: "👁️" },
    { num: 4, label: "cosas que puedas TOCAR o sentir", icon: "🖐️" },
    { num: 3, label: "cosas que puedas ESCUCHAR ahora mismo", icon: "👂" },
    { num: 2, label: "olores que puedas percibir", icon: "👃" },
    { num: 1, label: "cosa buena sobre ti mismo/a", icon: "❤️" }
  ];
  const [currentGStep, setCurrentGStep] = useState(0);

  const handleNextGStep = () => {
    if (currentGStep < steps.length - 1) {
      setCurrentGStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const step = steps[currentGStep];

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="text-6xl mb-6 animate-float">{step.icon}</div>
      <h4 className="text-xl sm:text-2xl text-slate-700 font-medium text-center mb-10 h-16">
        Encuentra <strong className="text-3xl text-[#8FA896] mx-2">{step.num}</strong> {step.label}
      </h4>
      
      <button 
        onClick={handleNextGStep}
        className="w-full py-4 rounded-2xl bg-white border border-[#E8F0EA] hover:border-[#8FA896] hover:shadow-md transition-all text-slate-600 font-medium text-lg"
      >
        {currentGStep < steps.length - 1 ? "Ya lo encontré, seguir" : "Completado, avanzar"}
      </button>
      
      <div className="flex gap-2 mt-8">
        {steps.map((_, idx) => (
          <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentGStep ? 'bg-[#8FA896] scale-125' : idx < currentGStep ? 'bg-[#B5C9B8]' : 'bg-slate-200'}`} />
        ))}
      </div>
    </div>
  );
}

function SOSOverlay({ onClose, userName }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = [
    userName ? `${userName}, respira profundo...` : "Respira profundo...",
    "Todo va a estar bien.",
    "Estás a salvo en este momento.",
    "Tómate todo el tiempo que necesites.",
    "Suelta la tensión de tus hombros.",
    "Poco a poco, a tu propio ritmo..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4500); 
    return () => clearInterval(interval);
  }, [phrases.length, userName]);

  return (
    <div className="fixed inset-0 bg-[#F4F7F5] z-[100] flex flex-col items-center justify-center animate-fade-in">
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E8F0EA] blur-3xl opacity-80 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E9EAF0] blur-3xl opacity-80 pointer-events-none"></div>
      
      <div className="absolute top-10 left-10">
        <Lumi className="w-20 h-20 opacity-80" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center w-full px-6">
        <h2 key={phraseIndex} className="text-3xl sm:text-4xl font-medium text-[#7A9382] mb-16 h-12 animate-fade-in">
          {phrases[phraseIndex]}
        </h2>

        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-20 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#E8F0EA] rounded-full opacity-60"></div>
          <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-90 animate-smooth-breathe shadow-xl shadow-[#B5C9B8]/40"></div>
          <div className="relative z-10 text-2xl sm:text-3xl font-medium text-slate-700 tracking-wider">
            Respira
          </div>
        </div>

        <button 
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 font-medium px-10 py-4 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all border border-[#E8F0EA] text-lg"
        >
          Ya me siento un poco mejor, volver
        </button>
      </div>
    </div>
  );
}

function BreathingExercise({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [phaseText, setPhaseText] = useState('Prepárate...');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 60) return;
    const elapsed = 60 - timeLeft;
    const cyclePos = elapsed % 12;
    if (cyclePos < 4) setPhaseText('Inhala lento...');
    else if (cyclePos < 8) setPhaseText('Sostén el aire...');
    else setPhaseText('Exhala despacio...');
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56 mx-auto mb-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#F0F4F1] rounded-full opacity-50"></div>
        <div className="absolute w-28 h-28 rounded-full opacity-90 animate-smooth-breathe shadow-lg shadow-[#B5C9B8]/30"></div>
        <div className="relative z-10 text-xl font-medium text-slate-700 tracking-wide text-center px-4">
          {phaseText}
        </div>
      </div>

      <div className="text-slate-400 font-medium mb-8 tabular-nums text-xl">
        00:{timeLeft.toString().padStart(2, '0')}
      </div>

      <button 
        onClick={onComplete}
        className="text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 font-medium px-8 py-3 rounded-full transition-colors"
      >
        {timeLeft > 0 ? "Saltar este paso si lo necesitas" : "Continuar a la siguiente parada"}
      </button>
    </div>
  );
}  
