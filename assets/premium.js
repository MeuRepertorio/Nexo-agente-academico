/* NEXO ULTRA PRIME — melhorias de interface; a base acadêmica permanece intocada. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const LAST_KEY = 'nexo_last_activity_v1';
  const COLORS = {historia:'#8b90ff',geografia:'#41c5e8',ingles:'#e6a46c',fisica:'#9d88ff',biologia:'#58cda6',quimica:'#ee8bba',portugues:'#bb9afa',matematica:'#79a9ff'};
  const icons = {
    book: '<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="M4.5 19.5A2.5 2.5 0 0 1 7 17h12.5M7 2.5h12.5v19H7a2.5 2.5 0 0 1-2.5-2.5V5A2.5 2.5 0 0 1 7 2.5Z"/></svg>',
    bolt:'<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z"/></svg>',
    target:'<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
    home:'<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="m3 10 9-7 9 7v10H3V10Zm6 10v-7h6v7"/></svg>',
    up:'<svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="m6 15 6-6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    focus:'<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" stroke-linecap="round"/></svg>'
  };
  const safely = (fn) => { try { return fn(); } catch { return null; } };
  const getLast = () => safely(() => JSON.parse(localStorage.getItem(LAST_KEY) || 'null'));
  const setLast = (subjectId, lessonIdx, actIdx) => safely(() => localStorage.setItem(LAST_KEY, JSON.stringify({subjectId,lessonIdx,actIdx})));

  function initScene(){
    document.body.insertAdjacentHTML('afterbegin', '<div id="global-aurora" aria-hidden="true"></div><div id="global-grid" aria-hidden="true"></div><div id="cursor-glow" aria-hidden="true"></div><div id="scroll-progress" aria-hidden="true"></div>');
    document.body.insertAdjacentHTML('beforeend', `<button id="back-to-top" aria-label="Voltar ao início da página" title="Voltar ao topo">${icons.up}</button>`);
    const back = document.getElementById('back-to-top');
    back.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduceMotion.matches?'auto':'smooth'}));
    let raf = 0;
    const onScroll = () => {
      if(raf) return;
      raf = requestAnimationFrame(()=>{
        const max = Math.max(1, document.documentElement.scrollHeight-innerHeight);
        document.getElementById('scroll-progress').style.width = `${Math.min(100,scrollY/max*100)}%`;
        back.classList.toggle('is-visible',scrollY>360);
        raf = 0;
      });
    };
    addEventListener('scroll',onScroll,{passive:true});
    if(!coarse && !reduceMotion.matches){
      let mouseFrame=0, posX=innerWidth/2,posY=innerHeight/3;
      document.addEventListener('pointermove',(e)=>{
        posX=e.clientX;posY=e.clientY;
        if(mouseFrame) return;
        mouseFrame=requestAnimationFrame(()=>{
          document.documentElement.style.setProperty('--mouse-x',`${posX}px`);
          document.documentElement.style.setProperty('--mouse-y',`${posY}px`);
          mouseFrame=0;
        });
      },{passive:true});
    }
    onScroll();
    initMeteors();
  }
  function initMeteors(){
    if(reduceMotion.matches || navigator.connection?.saveData) return;
    const c=document.createElement('canvas');
    c.id='nexo-meteors';c.setAttribute('aria-hidden','true');
    Object.assign(c.style,{position:'fixed',inset:'0',width:'100%',height:'100%',zIndex:'0',pointerEvents:'none',opacity:'.55'});
    document.body.prepend(c);
    const ctx=c.getContext('2d');if(!ctx) return;
    let w=0,h=0,stars=[],last=0,spawnAfter=0;
    function resize(){const dpr=Math.min(devicePixelRatio||1,1.6);w=innerWidth;h=innerHeight;c.width=Math.floor(w*dpr);c.height=Math.floor(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
    addEventListener('resize',resize,{passive:true});resize();
    function frame(t){
      if(document.hidden){last=t;requestAnimationFrame(frame);return}
      const dt=Math.min((t-last||16)/16,2.1);last=t;
      ctx.clearRect(0,0,w,h);
      if(t>spawnAfter && stars.length<2){stars.push({x:Math.random()*w*.95,y:Math.random()*h*.36,v:3+Math.random()*2,life:0,max:36+Math.random()*24});spawnAfter=t+4200+Math.random()*6500}
      for(const s of stars){s.life+=dt;s.x+=s.v*dt;s.y+=s.v*.33*dt;const alpha=Math.sin(Math.PI*s.life/s.max)*.75;
        const grad=ctx.createLinearGradient(s.x-110,s.y-37,s.x,s.y);grad.addColorStop(0,'rgba(140,170,255,0)');grad.addColorStop(1,`rgba(178,217,255,${Math.max(0,alpha)})`);
        ctx.strokeStyle=grad;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(s.x-110,s.y-37);ctx.lineTo(s.x,s.y);ctx.stroke();
      }
      stars=stars.filter(s=>s.life<s.max);requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  function initHeader(){
    const hdr=document.querySelector('header .max-w-7xl');if(!hdr)return;
    const originalProgress=document.getElementById('global-progress-text')?.parentElement;
    if(originalProgress){
      const actions=document.createElement('div');actions.id='top-actions';
      originalProgress.parentNode.insertBefore(actions,originalProgress);
      const home=document.createElement('button');home.id='btn-quick-home';home.className='icon-control';home.title='Voltar ao painel';home.setAttribute('aria-label','Voltar ao painel');home.innerHTML=icons.home;
      home.addEventListener('click',()=>openHub());actions.append(home);
      const mobile=document.createElement('span');mobile.id='mobile-progress';actions.append(mobile);
      actions.append(originalProgress);
    }
  }
  function animateNumber(el, value){
    if(!el) return;
    if(reduceMotion.matches){el.textContent=value;return}
    let start=null;const frames=650;
    function tick(t){if(start===null)start=t;const p=Math.min((t-start)/frames,1);el.textContent=Math.round(value*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)}
    requestAnimationFrame(tick);
  }
  function updateMobileProgress(){
    const el=document.getElementById('mobile-progress');if(!el)return;
    let done=0,total=0;
    SUBJECTS.forEach(s=>{const x=getSubjectProgress(s);done+=x.done;total+=x.total});
    el.textContent=`${done}/${total}`;
  }
  function bindSpotlight(root=document){
    root.querySelectorAll('.glass-card').forEach(card=>{
      if(card.dataset.spotlight)return;card.dataset.spotlight='1';
      if(coarse || reduceMotion.matches)return;
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect();card.style.setProperty('--card-x',`${e.clientX-r.left}px`);card.style.setProperty('--card-y',`${e.clientY-r.top}px`);
      },{passive:true});
    });
  }
  function enhanceHub(){
    updateMobileProgress();
    const main=document.getElementById('app-main');const hero=main.querySelector('.nexo-hero');
    const all=SUBJECTS.reduce((n,s)=>n+s.lessons.length,0);let finished=0;
    SUBJECTS.forEach(s=>finished+=getSubjectProgress(s).done);
    const metricA=document.getElementById('metric-done');const metricB=document.getElementById('metric-lessons');
    animateNumber(metricA,finished);animateNumber(metricB,all);
    const heroFirst=document.getElementById('hero-explore');
    if(heroFirst)heroFirst.addEventListener('click',()=>main.querySelector('#nexo-subjects')?.scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth',block:'start'}));
    const resume=document.getElementById('hero-resume');
    const last=getLast();
    const found=last && SUBJECTS.some(s=>s.id===last.subjectId && s.lessons[last.lessonIdx]?.activities[last.actIdx]);
    if(resume){
      if(found){
        const sub=SUBJECTS.find(s=>s.id===last.subjectId);const lesson=sub.lessons[last.lessonIdx];
        resume.textContent=`Continuar: ${sub.name} · Aula ${String(lesson.num).padStart(2,'0')} ↗`;
        resume.title=`Retomar ${lesson.title}`;
        resume.addEventListener('click',()=>openActivity(last.subjectId,last.lessonIdx,last.actIdx));
      }else{
        resume.textContent='Buscar uma aula ↗';resume.addEventListener('click',openSearchModal);
      }
    }
    const colors=main.querySelectorAll('.subject-card');
    colors.forEach((card,i)=>{
      card.style.setProperty('--subject-color',COLORS[card.dataset.subjectId]||'#7a91ff');
      card.dataset.serial=String(SUBJECTS.findIndex(s=>s.id===card.dataset.subjectId)+1).padStart(2,'0');
      card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label',`Abrir ${SUBJECTS.find(s=>s.id===card.dataset.subjectId)?.name||'matéria'}`);
      card.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();openSubject(card.dataset.subjectId)}});
    });
    // Posiciona a matéria ativa sem deslocamentos violentos em mobile.
    const carousel=main.querySelector('#hub-carousel');
    if(carousel && !coarse){
      carousel.addEventListener('wheel',e=>{
        if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
        if(e.shiftKey){e.preventDefault();carousel.scrollLeft+=e.deltaY}
      },{passive:false});
    }
    if(hero && !coarse && !reduceMotion.matches){
      hero.addEventListener('pointermove',(e)=>{
        const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        hero.querySelector('.orbit-scene')?.style.setProperty('transform',`translate3d(${(x*9).toFixed(1)}px,${(y*9).toFixed(1)}px,0)`);
      },{passive:true});
      hero.addEventListener('pointerleave',()=>{const orb=hero.querySelector('.orbit-scene');if(orb)orb.style.transform='translate3d(0,0,0)'});
    }
    bindSpotlight(main);
  }
  function enhanceTimeline(){
    updateMobileProgress();
    const main=document.getElementById('app-main');bindSpotlight(main);
    const subject=SUBJECTS.find(s=>s.id===state.subjectId);
    if(!subject)return;
    const track=main.querySelector('#timeline-track');
    if(track){track.setAttribute('aria-label',`Linha do tempo de ${subject.name}`);track.setAttribute('role','group')}
    main.querySelectorAll('.timeline-node').forEach((node,idx)=>{
      node.setAttribute('aria-label',`Aula ${String(subject.lessons[idx].num).padStart(2,'0')}: ${subject.lessons[idx].title}`);
      node.setAttribute('aria-current',String(idx===state.lessonIndex));
    });
    const title=main.querySelector('h1');if(title){title.style.fontFamily="'Space Grotesk',sans-serif";title.style.letterSpacing='-.055em';}
  }
  function enhanceActivity(){
    updateMobileProgress();
    const main=document.getElementById('app-main');bindSpotlight(main);
    const section=main.querySelector('section');if(!section)return;
    const subject=SUBJECTS.find(s=>s.id===state.subjectId);
    const lesson=subject?.lessons[state.lessonIndex];if(!lesson)return;
    const breadcrumb=section.querySelector('.flex.flex-wrap.items-center.justify-between');
    if(breadcrumb && !document.getElementById('nexo-focus-toggle')){
      const toggle=document.createElement('button');toggle.id='nexo-focus-toggle';toggle.type='button';toggle.innerHTML=`${icons.focus}<span>Modo foco</span>`;
      toggle.setAttribute('aria-pressed',String(document.body.classList.contains('focus-mode')));
      const navigation=breadcrumb.querySelector('div:last-child');
      if(navigation)navigation.prepend(toggle);
      toggle.addEventListener('click',()=>{
        const active=document.body.classList.toggle('focus-mode');toggle.setAttribute('aria-pressed',String(active));
        toggle.querySelector('span').textContent=active?'Sair do foco':'Modo foco';
      });
      if(document.body.classList.contains('focus-mode'))toggle.querySelector('span').textContent='Sair do foco';
    }
    const aside=main.querySelector('aside');if(aside){aside.style.setProperty('--card-x','50%');aside.style.setProperty('--card-y','0%')}
    // Título e respostas são sempre derivados da base acadêmica original.
    const title=main.querySelector('h1');if(title){title.style.fontFamily="'Space Grotesk',sans-serif";title.style.letterSpacing='-.045em';}
  }
  function hookFunctions(){
    const originalHub=renderHub, originalTimeline=renderTimeline,originalActivity=renderActivity;
    renderHub = function(...a){originalHub(...a);enhanceHub()};
    renderTimeline = function(...a){originalTimeline(...a);enhanceTimeline()};
    renderActivity = function(...a){originalActivity(...a);enhanceActivity()};
    const originalOpenActivity=openActivity;
    openActivity=function(subjectId,lessonIdx,actIdx=0){setLast(subjectId,lessonIdx,actIdx);originalOpenActivity(subjectId,lessonIdx,actIdx)};
    render();
  }
  function enhanceSearch(){
    const input=document.getElementById('search-input');const list=document.getElementById('search-results');
    if(!input||!list)return;
    let index=0;
    function updateSelection(){const items=[...list.querySelectorAll('.search-item')];items.forEach((item,i)=>item.classList.toggle('command-selected',i===index));const active=items[index];if(active)active.scrollIntoView({block:'nearest'})}
    input.addEventListener('input',()=>{index=0;queueMicrotask(updateSelection)});
    input.addEventListener('keydown',e=>{
      const items=[...list.querySelectorAll('.search-item')];if(!items.length)return;
      if(e.key==='ArrowDown'){e.preventDefault();index=(index+1)%items.length;updateSelection()}
      if(e.key==='ArrowUp'){e.preventDefault();index=(index-1+items.length)%items.length;updateSelection()}
      if(e.key==='Enter'){e.preventDefault();items[index]?.click()}
    });
    const originalSearch=openSearchModal;
    openSearchModal=function(){originalSearch();index=0;queueMicrotask(updateSelection)};
    const originalClose=closeSearchModal;
    closeSearchModal=function(){originalClose();document.getElementById('btn-open-search')?.focus()};
  }
  function initKeyboard(){
    document.addEventListener('keydown',e=>{
      const target=e.target;if(['INPUT','TEXTAREA'].includes(target?.tagName)||document.getElementById('search-modal')?.classList.contains('flex'))return;
      if(e.key==='/' && !e.ctrlKey && !e.metaKey){e.preventDefault();openSearchModal()}
      if(state.screen==='activity' && e.altKey && e.key==='ArrowRight'){e.preventDefault();document.getElementById('btn-next-act')?.click()}
      if(state.screen==='activity' && e.altKey && e.key==='ArrowLeft'){e.preventDefault();document.getElementById('btn-prev-act')?.click()}
    });
  }
  initScene();initHeader();enhanceSearch();hookFunctions();initKeyboard();
})();
