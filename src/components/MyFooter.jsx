import CompanyLogo from "../assets/nyoworks-logo.png"
import LightLogo from "../assets/tiap-nav-logo-light.png"

function MyFooter() {
  return (
    <div style={
      {
        height: "20px",
        width: "100%",
        backgroundColor: "#403f3f",
        position: "fixed",
        bottom: 0,
        left: 0,
      }
    }
      className="flex items-center justify-end z-40">


      <ul style={
        {
          listStyle: "none",
          marginBottom: 0
        }
      }
      className="flex items-end justify-end gap-1 pr-2">
       <div className="flex items-center gap-1">
        <a href="https://github.com/naimyasirozcan/tiap-app"><img style={{height: "18px"}} src={LightLogo} /></a>
        <a href="https://linkedin.com/in/naimyasirozcan"> <img style={{height: "24px"}} src={CompanyLogo} /></a>
       </div>
      </ul>

    </div>
  )
}

export default MyFooter
