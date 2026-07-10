const SENHA_CORRETA = "weareexo21";

const PLAYLIST = [
  { titulo: "Bungee", artista: "BAEKHYUN", arquivo: "musicas/BAEKHYUN - Bungee.mp3", capa: "capas-album/delight.png" },
  { titulo: "Good Morning", artista: "BAEKHYUN", arquivo: "musicas/BAEKHYUN - Good Morning.mp3", capa: "capas-album/hello-world.png" },
  { titulo: "Heaven Can Wait", artista: "Michael Jackson", arquivo: "musicas/Michael Jackson - Heaven Can Wait.mp3", capa: "capas-album/invincible.png" },
  { titulo: "Underwater", artista: "BAEKHYUN", arquivo: "musicas/BAEKHYUN - Underwater.mp3", capa: "capas-album/delight.png" },
  { titulo: "Butterflies", artista: "Michael Jackson", arquivo: "musicas/Michael Jackson - Butterflies.mp3", capa: "capas-album/invincible.png" },
  { titulo: "Rendez-Vous", artista: "BAEKHYUN", arquivo: "musicas/BAEKHYUN - Rendez-Vous.mp3", capa: "capas-album/hello-world.png" },
  { titulo: "Ice Queen", artista: "BAEKHYUN", arquivo: "musicas/BAEKHYUN - Ice Queen.mp3", capa: "capas-album/city-lights.png" },
  { titulo: "UN Village", artista: "BAEKHYUN", arquivo: "musicas/BAEKHYUN - UN Village.mp3", capa: "capas-album/city-lights.png" },
  { titulo: "Bambi", artista: "BAEKHYUN", arquivo: "musicas/BAEKHYUN - Bambi.mp3", capa: "capas-album/bambi.png" },
  { titulo: "Betcha", artista: "BAEKHYUN", arquivo: "musicas/BAEKHYUN - Betcha.mp3", capa: "capas-album/city-lights.png" },
  { titulo: "Pineapple Slice", artista: "BAEKHYUN", arquivo: "musicas/BAEKHYUN - Pineapple Slice.mp3", capa: "capas-album/hello-world.png" },
  { titulo: "Billie Jean", artista: "Michael Jackson", arquivo: "musicas/Michael Jackson - Billie Jean.mp3", capa: "capas-album/thriller.png" }
];

function atualizarRelogio() {
  const agora = new Date();
  const hora = String(agora.getHours()).padStart(2, "0");
  const min = String(agora.getMinutes()).padStart(2, "0");
  document.getElementById("hora").textContent = `${hora}:${min}`;

  const dias = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
  const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
  document.getElementById("data").textContent = `${dias[agora.getDay()]}, ${agora.getDate()} de ${meses[agora.getMonth()]}`;
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000 * 30);

const lockscreen = document.getElementById("lockscreen");
const fundoBloqueio = document.getElementById("fundo-bloqueio");
const estagioBloqueio = document.getElementById("estagio-bloqueio");
const estagioLogin = document.getElementById("estagio-login");
const inputSenha = document.getElementById("input-senha");
const btnEntrar = document.getElementById("btn-entrar");
const dicaSenha = document.getElementById("dica-senha");
const btnDica = document.getElementById("btn-dica");
const stickerDalek = document.getElementById("sticker-dalek");

let timerInatividade;
const TEMPO_BLOQUEIO = 1000 * 60 * 10; 

const sessaoSalva = localStorage.getItem("sessao_nini");
if (sessaoSalva && (Date.now() - parseInt(sessaoSalva) < TEMPO_BLOQUEIO)) {
  if (lockscreen) lockscreen.classList.add("abrindo");
  resetarTimer();
}

if (estagioBloqueio) {
  estagioBloqueio.addEventListener("click", () => {
    fundoBloqueio.classList.add("borrado");
    estagioBloqueio.classList.add("oculto");
    estagioLogin.classList.add("visivel");
    setTimeout(() => inputSenha.focus(), 500);
  });
}

function tentarEntrar() {
  if (inputSenha.value === SENHA_CORRETA) {
    localStorage.setItem("sessao_nini", Date.now().toString());
    lockscreen.classList.add("abrindo");
    dicaSenha.classList.remove("revelada");
    resetarTimer();
  } else {
    dicaSenha.textContent = "senha incorreta, tente de novo!";
    dicaSenha.classList.add("erro-senha");
    inputSenha.value = "";
    inputSenha.focus();
  }
}

if (btnEntrar) btnEntrar.addEventListener("click", tentarEntrar);
if (inputSenha) {
  inputSenha.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tentarEntrar();
  });
}
if (estagioLogin) estagioLogin.addEventListener("click", (e) => e.stopPropagation());

if (btnDica) {
  btnDica.addEventListener("click", (e) => {
    e.stopPropagation();
    dicaSenha.textContent = "slogan do exo";
    dicaSenha.classList.remove("erro-senha");
    dicaSenha.classList.toggle("revelada");
  });
}

document.querySelectorAll(".borda-decorativa img[data-audio]").forEach(img => {
  img.addEventListener("click", () => {
    const caminhoAudio = img.getAttribute("data-audio");
    if (caminhoAudio) {
      const somSticker = new Audio(caminhoAudio);
      somSticker.play().catch(() => {});
    }
  });
});

if (stickerDalek) {
  stickerDalek.addEventListener("click", () => {
    bloquearTelaNovamente();
  });
}

const envelope3d = document.getElementById("envelope-3d");
const carta = document.getElementById("carta");
const palco = document.getElementById("palco");
const btnCancoes = document.getElementById("btn-cancoes");
const btnFecharCarta = document.getElementById("btn-fechar-carta");
const photocard = document.getElementById("photocard");
const legendaEnvelope = document.querySelector(".envelope-legenda");

let photocardRevelado = false;

if (envelope3d) {
  envelope3d.addEventListener("click", () => {
    if (envelope3d.classList.contains("aberto")) return;
    envelope3d.classList.add("aberto");
    carta.classList.add("aberta");
    
    if (legendaEnvelope) {
      legendaEnvelope.style.transition = "opacity 0.4s ease";
      legendaEnvelope.style.opacity = "0";
      setTimeout(() => {
        legendaEnvelope.style.display = "none";
      }, 400);
    }
    
    if (photocard && !photocardRevelado) {
      photocard.classList.add("espiando");
    }
  });
}

function fecharCarta() {
  carta.classList.remove("aberta");
  setTimeout(() => {
    envelope3d.classList.remove("aberto");
  }, 500);

  if (photocard && !photocardRevelado) {
    photocard.classList.remove("espiando");
  }
}

if (btnFecharCarta) {
  btnFecharCarta.addEventListener("click", (e) => {
    e.stopPropagation();
    fecharCarta();
  });
}

if (btnCancoes) {
  btnCancoes.addEventListener("click", () => {
    carta.classList.remove("aberta");
    
    document.getElementById("media-widget").classList.add("playlist-ativa");
    
    if (photocard) {
      photocardRevelado = true;
      photocard.classList.remove("espiando");
      photocard.classList.add("revelado");
    }

    setTimeout(() => {
      envelope3d.classList.remove("aberto");
      palco.classList.add("mostrando-playlist");
      montarPlaylist();
    }, 500);
  });
}

const audio = document.getElementById("audio");
const listaMusicas = document.getElementById("lista-musicas");
const tituloMusica = document.getElementById("titulo-musica");
const artistaMusica = document.getElementById("artista-musica");
const btnPlay = document.getElementById("btn-play");
const btnAnterior = document.getElementById("btn-anterior");
const btnProximo = document.getElementById("btn-proximo");
const barraTempo = document.getElementById("barra-tempo");
const tempoAtual = document.getElementById("tempo-atual");
const tempoTotal = document.getElementById("tempo-total");
const barraVolume = document.getElementById("barra-volume");

let indiceAtual = 0;
let jaMontou = false;

function montarPlaylist() {
  if (jaMontou) return;
  jaMontou = true;

  PLAYLIST.forEach((musica, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${musica.capa}" class="capa-playlist" alt="Capa">
      <div class="wrap-texto">
        <span class="texto-musica">${musica.artista} - ${musica.titulo}</span>
      </div>
    `;
    li.addEventListener("click", () => carregarMusica(i, true));
    listaMusicas.appendChild(li);
  });

  setTimeout(() => {
    document.querySelectorAll('.wrap-texto').forEach(wrap => {
      const span = wrap.querySelector('.texto-musica');
      if (span.scrollWidth > wrap.clientWidth) {
        const dist = span.scrollWidth - wrap.clientWidth;
        span.style.setProperty('--scroll-dist', `-${dist}px`);
        span.classList.add('scrolling-text');
      }
    });
  }, 100);

  carregarMusica(0, false);
  audio.volume = barraVolume.value;
}

function carregarMusica(indice, tocarAutomatico) {
  indiceAtual = (indice + PLAYLIST.length) % PLAYLIST.length;
  const musica = PLAYLIST[indiceAtual];

  audio.src = musica.arquivo;
  tituloMusica.textContent = musica.titulo;
  artistaMusica.textContent = musica.artista;

  document.getElementById("mini-capa").src = musica.capa;
  document.getElementById("mini-titulo").textContent = musica.titulo;
  document.getElementById("mini-artista").textContent = musica.artista;
  
  const miniBtnPlay = document.getElementById("mini-btn-play");

  [...listaMusicas.children].forEach((li, i) => {
    if (i === indiceAtual) {
      li.classList.add("ativa");
    } else {
      li.classList.remove("ativa");
    }
  });

  if (tocarAutomatico) {
    audio.play().catch(() => {});
    btnPlay.textContent = "⏸";
    miniBtnPlay.textContent = "⏸";
  } else {
    btnPlay.textContent = "▶";
    miniBtnPlay.textContent = "▶";
  }
}

function alternarPlayPause() {
  const miniBtnPlay = document.getElementById("mini-btn-play");
  if (audio.paused) {
    audio.play().catch(() => {});
    btnPlay.textContent = "⏸";
    miniBtnPlay.textContent = "⏸";
  } else {
    audio.pause();
    btnPlay.textContent = "▶";
    miniBtnPlay.textContent = "▶";
  }
}

if (btnPlay) {
  btnPlay.addEventListener("click", alternarPlayPause);
}

document.getElementById("mini-btn-play").addEventListener("click", (e) => {
  e.stopPropagation();
  alternarPlayPause();
});

document.getElementById("mini-btn-anterior").addEventListener("click", (e) => {
  e.stopPropagation();
  carregarMusica(indiceAtual - 1, true);
});

document.getElementById("mini-btn-proximo").addEventListener("click", (e) => {
  e.stopPropagation();
  carregarMusica(indiceAtual + 1, true);
});

if (btnAnterior) btnAnterior.addEventListener("click", () => carregarMusica(indiceAtual - 1, true));
if (btnProximo) btnProximo.addEventListener("click", () => carregarMusica(indiceAtual + 1, true));

audio.addEventListener("ended", () => carregarMusica(indiceAtual + 1, true));

audio.addEventListener("loadedmetadata", () => {
  barraTempo.max = audio.duration || 0;
  tempoTotal.textContent = formatarTempo(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  barraTempo.value = audio.currentTime;
  tempoAtual.textContent = formatarTempo(audio.currentTime);
});

if (barraTempo) {
  barraTempo.addEventListener("input", () => {
    audio.currentTime = barraTempo.value;
  });
}

if (barraVolume) {
  barraVolume.addEventListener("input", () => {
    audio.volume = barraVolume.value;
  });
}

function formatarTempo(segundos) {
  if (!segundos || isNaN(segundos)) return "0:00";
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function bloquearTelaNovamente() {
  if (lockscreen) {
    localStorage.removeItem("sessao_nini"); 
    clearTimeout(timerInatividade);

    lockscreen.classList.remove("abrindo");
    fundoBloqueio.classList.remove("borrado");
    estagioBloqueio.classList.remove("oculto");
    estagioLogin.classList.remove("visivel");
    
    if (inputSenha) inputSenha.value = "";
    dicaSenha.classList.remove("revelada");
    dicaSenha.classList.remove("erro-senha");
  }
}

function resetarTimer() {
  clearTimeout(timerInatividade);
  if (lockscreen && lockscreen.classList.contains("abrindo")) {
    timerInatividade = setTimeout(bloquearTelaNovamente, TEMPO_BLOQUEIO);
  }
}

window.addEventListener("click", resetarTimer);
window.addEventListener("touchstart", resetarTimer);