import { Suspense, Fragment } from "react"
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"
import {
  adminRoutes,
  agentRoutes,
  baseRoutes,
  superAdminRoutes,
  superAgentRoutes,
} from "./routes"
import PrivateRoutes from "./PrivateRoutes"
import Fallback from "@/reusables/Fallback"
import ScrollToTop from "@/reusables/ScrollToTop"
import Auth from "@/utils/auth"

type RouteProps = {
  Component: React.ElementType
  path: string
  isAuthenticated?: boolean
  layout?: React.ElementType
}

const renderRoute = ({ Component, ...route }: RouteProps) => {
  const Private = (
    route.isAuthenticated ? PrivateRoutes : Fragment
  ) as React.ElementType
  const Layout = (route.layout ? route.layout : Fragment) as React.ElementType

  return (
    <Route
      key={route.path}
      path={route.path}
      element={
        <Layout>
          <ScrollToTop />
          <Suspense fallback={<Fallback />}>
            <Private>
              <Component />
            </Private>
          </Suspense>
        </Layout>
      }
    />
  )
}

export const AppRoutes = () => {
  const roleRoutes: Record<string, Array<RouteProps>> = {
    SUPER_ADMIN: superAdminRoutes,
    ADMIN: adminRoutes,
    AGENT: agentRoutes,
    SUPER_AGENT: superAgentRoutes,
    BASE: baseRoutes,
  }
  const userRole = Auth.getUserRole() || "BASE"

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <Routes>
              {roleRoutes[userRole]?.map((route) => renderRoute(route))}
            </Routes>
          }
        />
      </Routes>
    </Router>
  )
}
