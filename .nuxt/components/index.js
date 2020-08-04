export { default as Card } from '../../components/Card.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as Navbar } from '../../components/Navbar.vue'
export { default as ApplicationsListTable } from '../../components/Applications/ApplicationsListTable.vue'

export const LazyCard = import('../../components/Card.vue' /* webpackChunkName: "components/Card'}" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo'}" */).then(c => c.default || c)
export const LazyNavbar = import('../../components/Navbar.vue' /* webpackChunkName: "components/Navbar'}" */).then(c => c.default || c)
export const LazyApplicationsListTable = import('../../components/Applications/ApplicationsListTable.vue' /* webpackChunkName: "components/Applications/ApplicationsListTable'}" */).then(c => c.default || c)
