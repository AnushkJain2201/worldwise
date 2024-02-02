import { Link } from "react-router-dom"
import PageNav from "../components/PageNav"

const Homepage = () => {
  return (
    <div>

      <PageNav />
      <h1 className="test">Worldwise</h1>

      <Link to="/app">Go To the app</Link>
    </div>
  )
}

export default Homepage
