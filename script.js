function copyIP(){
  const ip = "play.sparklemc.fun:19136";
  navigator.clipboard.writeText(ip).then(() => {
    const el = document.getElementById("copyStatus");
    if(el){
      el.textContent = "✓ Server IP copied!";
      setTimeout(() => el.textContent = "", 2500);
    }
  });
}
