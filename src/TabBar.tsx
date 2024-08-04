export const TabBar = () => {
  const pathname = window.location.pathname

  return (
    <div className="TabBar">
      <a className={`${pathname === '/' ? 'active' : ''}`} href="/">
        BD2011
      </a>
      <a className={`${pathname === '/cuu-uoc' ? 'active' : ''}`} href="/cuu-uoc">
        CỰU ƯỚC
      </a>
      <a className={`${pathname === '/tan-uoc' ? 'active' : ''}`} href="/tan-uoc">
        TÂN ƯỚC
      </a>
    </div>
  )
}
