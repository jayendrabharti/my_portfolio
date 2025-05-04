const HamburgerIcon = ({opened}) => {
  return (
    <div className='space-y-2 scale-75 sm:scale-100'>

      <span className={`${opened?'-rotate-45':''} block w-8 border-2 border-textColor1 bg-textColor1 rounded-full transition-all duration-200 ease-in-out origin-right`}></span>
      
      <span className={`${opened?'opacity-0':'opacity-1'} block w-8 border-2 border-textColor1 bg-textColor1 rounded-full transition-all duration-200 ease-in-out`}></span>
      
      <span className={`${opened?'rotate-45':''} block w-8 border-2 border-textColor1 bg-textColor1 rounded-full transition-all duration-200 ease-in-out origin-right`}></span>
    
    </div>
  )
}

export default HamburgerIcon
