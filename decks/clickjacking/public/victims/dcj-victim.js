(function () {
  const isReal = new URLSearchParams(location.search).has('real')

  function openPopup() {
    window.open(
      './dcj.html' + (isReal ? '?real=1' : ''),
      '_blank',
      `popup=yes,width=${window.outerWidth},height=${window.outerHeight},left=${window.screenX},top=${window.screenY}`,
    )
  }

  function wireAllowButton() {
    document.getElementById('allow-btn').addEventListener('click', () => {
      document.getElementById('allow-btn').style.display = 'none'
      document.getElementById('granted').style.display = 'block'
    })
  }

  window.DCJVictim = {
    revealOAuth(cx, cy) {
      document.documentElement.classList.add('oauth-ready')
      document.title = 'HackerApp is requesting permission | Slack'
      if (cx != null) {
        const btn = document.getElementById('allow-btn')
        btn.style.top = `${cy}px`
        btn.style.left = `${cx}px`
        btn.style.transform = 'translate(-50%, -50%)'
      }
      wireAllowButton()
    },
  }

  if (isReal) {
    openPopup()
    return
  }

  openPopup()
})()
