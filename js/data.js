/*
 * Contenido de la app, resumido desde reglas/manual-de-juego.md y reglas/ayudas-de-mesa.md.
 * Si se edita el manual, este archivo hay que actualizarlo a mano (no hay build automático todavía).
 * "img" apunta a reglas/fichas del proyecto principal; quedan en null hasta generar las ilustraciones
 * (ver reglas/fichas/prompts-ilustraciones-ia.md) — la tarjeta se ve bien igual sin imagen.
 */

const ARQUETIPOS = [
  {
    nombre: "El Guardamonte",
    raiz: "Kurupí",
    img: "img/guardamonte.webp",
    resumen: "Protector del monte y de quien no puede defenderse. Cuerpo a cuerpo, resistente, feroz cuando hay una injusticia de por medio.",
    prioridad: "Fuerza, Vigor",
    oficios: "Monte, Forcejeo y pelea",
    don: "Furia del monte — una vez por escena, si un aliado fue lastimado o alguien caza/tala de más frente a él, gana +2 a su próxima tirada de ataque o Fuerza.",
    don4: "Respeto ganado — los animales y espíritus del monte con reputación neutral o mejor nunca lo atacan primero."
  },
  {
    nombre: "El Sigiloso de la Noche",
    raiz: "Pombero",
    img: "img/sigiloso-de-la-noche.webp",
    resumen: "Se mueve sin ser visto, conoce los sonidos del monte, negocia con lo que no se puede pelear. Ambivalente por diseño.",
    prioridad: "Destreza, Alma",
    oficios: "Sigilo, Trato con espíritus",
    don: "Imitar el monte — reproduce cantos de aves y sonidos del monte para distraer o engañar (Destreza vs. Ojo de Monte del objetivo).",
    don4: "Ofrenda rápida — resuelve una tirada de reputación con la mitad de la ofrenda material de lo normal."
  },
  {
    nombre: "El Gaucho Matrero",
    raiz: "montoneras entrerrianas",
    img: "img/gaucho-matrero.webp",
    resumen: "Jinete, rastreador, perseguido por alguna ley que ya no reconoce. Guerrero versátil de raíz criolla, no sobrenatural.",
    prioridad: "Destreza, Fuerza",
    oficios: "Equitación, Rastreo",
    don: "Conocedor del terreno — en monte, isla o campo abierto, ignora el primer punto de dificultad extra por terreno difícil.",
    don4: "Jinete fantasma — una vez por sesión, reaparece donde nadie lo esperaba (reingresa a una persecución o emboscada sin tirada)."
  },
  {
    nombre: "La Curandera Isleña",
    raiz: "brujas isleñas",
    img: "img/curandera-islena.webp",
    resumen: "Sabe de yuyos, de señales del cielo y del río. Cura, a veces maldice, siempre depende de lo que dicen de ella en el pueblo.",
    prioridad: "Alma, Astucia",
    oficios: "Herboristería y curación, Trato con espíritus",
    don: "Manos de yuyera — cura 1d6 + Alma de Aguante a un aliado (Herboristería, Dificultad 9), una vez por descanso.",
    don4: "Fama de bruja — tirada de Alma para \"leer\" el clima o el río antes de que algo pase (el Narrador da una pista real)."
  },
  {
    nombre: "El Trovador del Monte",
    raiz: "Zorro/Aguará",
    img: "img/trovador-del-monte.webp",
    resumen: "Pícaro, hablador, gana peleas con la cabeza antes que con las manos. El cuentacuentos del grupo.",
    prioridad: "Astucia, Alma",
    oficios: "Relato y canto, Conocimiento del folclore",
    don: "Zorro viejo — una vez por escena, repite una tirada social o de engaño que falló.",
    don4: "El cuento que salva — convierte una Dificultad social en Fácil (7) si narra en voz alta, dentro de la ficción, por qué merece confianza."
  },
  {
    nombre: "La Isleña / Hachera",
    raiz: "isleña y hachera",
    img: "img/islena-hachera.webp",
    resumen: "Gente práctica de río y monte ribereño, sin nada sobrenatural: cuchillo, canoa, obraje a cuestas.",
    prioridad: "Vigor, Ojo de Monte",
    oficios: "Río y remo, Artesanía",
    don: "Sabe arreglárselas — fabrica o improvisa una herramienta simple (Artesanía, Dificultad 9) en vez de tenerla comprada.",
    don4: "Nadie lo pesca de sorpresa en su terreno — en río o monte ribereño nunca es sorprendido (siempre actúa en la primera ronda)."
  },
  {
    nombre: "La Centinela del Estero",
    raiz: "Chajá",
    img: "img/centinela-del-estero.webp",
    resumen: "Gente de esteros y bañados, oído entrenado para la primera señal de peligro. Expansión (sección 14.1).",
    prioridad: "Ojo de Monte, Alma",
    oficios: "Rastreo, Monte",
    don: "Grito de alarma — una vez por escena, gasta su Acción y cancela una emboscada o sorpresa. Los enemigos quedan avisados de dónde está el grupo.",
    don4: "Lealtad del estero — si un aliado cae, llega hasta él con su Movimiento, sin gastar Acción y sin penalizar el terreno de estero."
  },
  {
    nombre: "El Hijo del Yaguareté",
    raiz: "Yaguareté",
    img: "img/hijo-del-yaguarete.webp",
    resumen: "Carga con algo del monte más bravo: fuerza totémica que hay que aprender a controlar. Expansión (sección 14.1).",
    prioridad: "Fuerza, Alma",
    oficios: "Forcejeo y pelea, Conocimiento del folclore",
    don: "Sangre de monte — trance totémico: +2 a Fuerza un asalto completo. Al terminar la escena pierde 1 de Aguante (solo lo cura un descanso, no la Curandera).",
    don4: "Respeto del monte — los animales reales no lo atacan salvo que él ataque primero; puede calmar a una bestia furiosa con Alma (Dificultad 9)."
  }
];

const BESTIARIO = [
  {
    nombre: "Moñái",
    img: "img/monai.webp",
    stats: "Aguante 24 · Defensa 9 · Ataque +3, dos golpes/ronda (1d6+3 c/u) · Frente máx. 3",
    rasgo: "Vuela y ataca al paso; huye bajo la mitad de Aguante.",
    alternativa: "Reforzar el sello de Pa'i Zume (Astucia o Alma, Dificultad 9) evita el combate."
  },
  {
    nombre: "Jasy Jatere",
    img: "img/jasy-jatere.webp",
    stats: "Aguante 10 · Defensa 9 · Hipnotiza (Alma vs. Astucia+2)",
    rasgo: "No está pensado para matarlo.",
    alternativa: "Se lo aleja con ruido (Dificultad 9) o se le roba el bastón de oro (Destreza, Dificultad 11), fuente real de su poder."
  },
  {
    nombre: "Teju Jagua",
    img: "img/teju-jagua.webp",
    stats: "Aguante 24 · Defensa 10 · Ataque +2, dos mordiscos/ronda (1d6+2 c/u) · Frente máx. 1 (boca de cueva angosta)",
    rasgo: "Sedentario: nunca persigue fuera de su cueva.",
    alternativa: "Ofrenda de frutas silvestres (Dificultad 9) evita el enfrentamiento por completo."
  },
  {
    nombre: "Mbói Tu'i",
    img: "img/mboi-tui.webp",
    stats: "Aguante 22 · Defensa 9 · Ataque +3 (1d6+3) · Frente máx. 3",
    rasgo: "Huye ante fuego o ruido fuerte.",
    alternativa: "Puede volverse aliado de una comunidad pescadora/isleña con buena Reputación."
  },
  {
    nombre: "Kurupí",
    img: "img/kurupi.webp",
    stats: "Aguante 28 · Defensa 10 · Ataque +4 (2d6+1) · Frente máx. 2",
    rasgo: "Solo ataca a quien lastimó el monte o amenazó a alguien indefenso.",
    alternativa: "Su hostilidad depende de las acciones previas del grupo, no es fija."
  },
  {
    nombre: "Ao Ao",
    img: "img/ao-ao.webp",
    stats: "Aguante 26 · Defensa 12 · Ataque +4 (2d6), actúa dos veces/ronda · Frente máx. 2",
    rasgo: "Cuero correoso: solo un éxito pleno le hace daño real. No puede trepar.",
    alternativa: "Diseñado para ser casi imposible de ganar peleando: la solución real es llegar a una palmera pindó (Destreza, Dificultad 9, bajo presión de tiempo)."
  },
  {
    nombre: "Luison",
    img: "img/luison.webp",
    stats: "Aguante 28 · Defensa 13 · Ataque +4 (2d6+2) · Frente máx. 3",
    rasgo: "Sin plata no hay herida que valga: con arma común, un éxito con costo no cuenta. Con plata, cualquier golpe que conecte es real.",
    alternativa: "\"Salvarlo\" con un ritual de apadrinamiento (Alma, Dificultad 13) rompe la maldición sin matarlo."
  }
];

const PNJ = [
  {
    nombre: "Pombero",
    img: "img/pombero.webp",
    rol: "Espíritu del monte, se mueve sin ser visto y conoce todos sus sonidos.",
    reputacion: "Nunca se lo vence peleando (Aguante 12, Defensa 11 — casi imposible de tocar): se lo aplaca o se lo evita.",
    ofrenda: "Tabaco, miel, caña con cascarilla de huevo. Respetar el monte de noche/siesta sube su Reputación; entrar sin permiso o cazar de más la baja."
  },
  {
    nombre: "Dueño de los Animales",
    img: "img/dueno-de-los-animales.webp",
    rol: "Guardián de la fauna del monte, protector de quienes cazan solo lo necesario.",
    reputacion: "No tiene estadísticas de combate — no ataca, castiga la caza excesiva escondiendo presas y bajando Reputación.",
    ofrenda: "Cazar con mesura y devolver algo al monte. No hay ofrenda material fija: se gana con la conducta del grupo, no con un objeto."
  },
  {
    nombre: "El dueño del río",
    img: "img/dueno-del-rio.webp",
    rol: "Entidad de remolinos y corrientes del Paraná, presagio fluvial en noches de niebla o creciente.",
    reputacion: "Igual que el Pombero: se resuelve por Reputación, no por combate. Nombrarlo al atardecer o cruzar sin respeto es una falta documentada.",
    ofrenda: "Tabaco, miel, caña con cascarilla de huevo. Respetar horarios y pasos seguros del río lo mantiene favorable."
  },
  {
    nombre: "Brujas isleñas / curanderas",
    img: "img/brujas-islenas.webp",
    rol: "Mujeres de saberes de yuyos y curación, reinterpretadas en la oralidad como brujas con poder sobre el clima y la salud.",
    reputacion: "Su poder depende de la reputación que tengan en el pueblo — se las puede desacreditar, ganar como aliadas o temer como antagonistas.",
    ofrenda: "Hospitalidad y yerba compartida. También sube o baja según cómo el grupo hable de ellas frente al pueblo (defenderlas o acusarlas en público)."
  }
];

const REGLAS_RAPIDAS = {
  formula: "2d6 + Atributo + Oficio (si aplica) vs. Dificultad",
  dificultades: [
    ["Trivial", 5], ["Fácil", 7], ["Media", 9], ["Difícil", 11], ["Heroica", 13], ["Legendaria", 14]
  ],
  resultados: [
    ["Éxito pleno", "Total ≥ Dificultad + 3, o doble 6 natural", "Lo lográs sin costo. En ataque: daño completo + efecto extra menor. El doble 6 siempre es éxito pleno y en ataque siempre pega."],
    ["Éxito con costo", "Total ≥ Dificultad, por menos de 3", "Lo conseguís, pero pasa algo más: gastás un recurso, el ser toma nota de vos, quedás expuesto, se te va el tiempo."],
    ["Fracaso", "Total < Dificultad", "No lo conseguís. El peligro de la escena avanza."]
  ],
  combate: [
    ["Iniciativa", "1d6 + Destreza, una sola vez; el orden queda fijo. Los seres del Narrador actúan al final de cada ronda."],
    ["Turno", "Una Acción y un Movimiento (el Movimiento puede cambiarse por una acción menor)."],
    ["Ataque", "2d6 + Fuerza o Destreza (según el arma) + Oficio vs. Defensa. Éxito con costo: daño a la mitad, redondeado hacia arriba."],
    ["Derribado", "Aguante 0: cada ronda 2d6 + Vigor vs. 9. Pleno se estabiliza; con costo sigue igual; fracaso pierde un aliento de vida (al tercero, muere). Un aliado puede estabilizarlo con su Acción."]
  ],
  descansos: [
    ["Descanso corto", "Recupera 1d6 de Aguante. Se puede hacer uno después de cada combate o peligro grande, no dos seguidos."],
    ["Noche segura", "Recupera todo el Aguante y borra los alientos de vida perdidos."]
  ],
  nota: "Heroica y Legendaria son casi imposibles con modificador total 0 — son el techo del juego, para el especialista de la escena."
};
