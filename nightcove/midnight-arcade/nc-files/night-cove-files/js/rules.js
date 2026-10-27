(function(root){
  'use strict';
  const game=root.NC_CASE;
  const stage=state=>Math.min(state.solved.length,5);
  const available=(exhibit,state)=>exhibit.stage<=stage(state);
  const defaults=()=>({version:1,caseId:game.id,started:false,seen:[],pins:[],solved:[],notes:'',timeline:['discovery','depart','encounter','window','exit','message'],chronology:false,completed:false,fragment:false,hints:{},sound:false,largeText:false});
  function restore(input){
    const clean=defaults();
    if(!input||input.caseId!==game.id||input.version!==1)return clean;
    const ids=new Set(game.exhibits.map(e=>e.id));
    clean.started=input.started===true;
    for(const d of game.deductions){if(!Array.isArray(input.solved)||!input.solved.includes(d.id)||!d.requires.every(x=>clean.solved.includes(x)))break;clean.solved.push(d.id);}
    for(const key of ['seen','pins'])clean[key]=Array.isArray(input[key])?[...new Set(input[key].filter(id=>ids.has(id)&&available(game.exhibits.find(e=>e.id===id),clean)))]:[];
    clean.notes=typeof input.notes==='string'?input.notes.slice(0,16000):'';
    if(Array.isArray(input.timeline)&&input.timeline.length===6&&new Set(input.timeline).size===6&&input.timeline.every(id=>game.chronology.includes(id)))clean.timeline=input.timeline.slice();
    clean.chronology=clean.solved.length===6&&input.chronology===true&&clean.timeline.join(',')===game.chronology.join(',');
    clean.completed=clean.chronology&&input.completed===true;clean.fragment=clean.completed&&input.fragment===true;
    for(const d of game.deductions)clean.hints[d.id]=Math.max(0,Math.min(3,Number.isInteger(input.hints?.[d.id])?input.hints[d.id]:0));
    clean.sound=input.sound===true;clean.largeText=input.largeText===true;return clean;
  }
  function checkDeduction(id,answer,sources,state){
    const d=game.deductions.find(item=>item.id===id);
    if(!d||!d.requires.every(x=>state.solved.includes(x)))return{ok:false,message:'Follow the preceding lead before making this finding.'};
    if(answer!==d.answer)return{ok:false,message:'That explanation goes beyond these sources or contradicts them. Check direct observations against assumptions.'};
    if(!Array.isArray(sources)||!d.sources.every(source=>sources.includes(source)&&state.pins.includes(source)))return{ok:false,message:'The explanation needs more support. Cite the pinned sources that establish each part of it; one source may explain only part of the claim.'};
    return{ok:true,message:d.finding};
  }
  function checkFinal(answer,state){
    if(state.solved.length!==6||!state.chronology)return{ok:false,message:'Complete all six supported findings and check the chronology before submitting.'};
    const tests=[
      [answer.killer==='pavel','Revisit who was with Ruth and whose account contradicts independent records.'],
      [answer.motive==='records','Ruth’s packet establishes the dispute. Choose the motive those documents support.'],
      [answer.child==='alexei','Keep the children’s journey separate from the murder.'],
      [answer.sighting==='figure','Use the restoration, cardigan, and sightline findings for the window sighting.'],
      [answer.physical==='E23'&&state.pins.includes('E23'),'Cite the pinned laboratory examination for the physical link.'],
      [answer.location==='E17'&&state.pins.includes('E17'),'Cite the pinned independent photograph for Pavel’s location.'],
      [answer.dispute==='E21'&&state.pins.includes('E21'),'Cite the pinned independent correspondence for the disputed authority.']
    ];const failed=tests.find(test=>!test[0]);return failed?{ok:false,message:failed[1]}:{ok:true,message:'Reconstruction supported. The corrected record is ready.'};
  }
  root.NC_RULES={defaults,restore,stage,available,checkDeduction,checkFinal};
})(typeof window!=='undefined'?window:globalThis);
