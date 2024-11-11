
import Iconify from '../../components/Iconify';
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = {
  1:
  {
    title: 'Main',
    path: '/dashboard/app',
    icon: getIcon("ic:baseline-home"),
    id: ['0', '1', '3', '7', '9', '11','12']
  },
  2: {
    title: 'Main',
    path: '/dashboard/app',
    icon: getIcon('ic:baseline-home'),
    id: ['5']
  },
  // 3: {
  //   title: 'Gelathi Program',
  //   path: '/dashboard/gelathiprogramdashboard',
  //   icon: getIcon("foundation:torsos-all-female"),
  //   id: ['6', '13']
  // },
  4: {
    title: 'Main',
    path: '/dashboard/app',
    icon: getIcon('ic:baseline-home'),
    id: ['4']
  },
  5: {
    title: 'BusList',
    path: '/dashboard/buslist',
    icon: getIcon('mdi:bus-stop'),
    id: ['0', '1', '2', '3', '4', '5', '6', '9', '7', '8', '12','11']
  },
  6: {
    title: 'Plan Of Action',
    path: '/dashboard/planofaction',
    icon: getIcon('mdi:clipboard-text'),
    id: ['0', '1', '3', '4', '5', '6', '7', '9', '8', '12', '13','11']
  },
  7: {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: getIcon('ic:baseline-library-books'),
    id: ['0', '1', '2', '3', '4', '5', '6', '7', '9', '8', '12', '13','11']
  },
  8: {
    title: 'People',
    path: '/dashboard/people',
    icon: getIcon('eva:people-fill'),
    id: ['0', '1', '2', '3', '4', '12','11','5']
  },
  9: {
    title: 'Buzz Stock',
    path: '/dashboard/BuzzStock',
    icon: getIcon('ant-design:stock-outlined'),
    id: ['0', '1', '2', '3', '4', '12','11','5']
  },
  10: {
    title: 'My Profile',
    path: '/dashboard/profile',
    icon: getIcon('mdi:user'),
    id: ['0', '1', '2', '3', '4', '5', '6', '9', '7', '8', '12', '13','11']
  },
  11: {
    title: 'Demography',
    path: '/dashboard/demogrphy',
    icon: getIcon('material-symbols:demography'),
    id: ['0', '1', '3', '12','11']
  },
  12: {
    title: 'Travel Allowance',
    path: '/dashboard/travel',
    icon: getIcon('mdi:wallet-travel'),
    id: ['0', '3', '4', '5', '6', '9', '7', '8', '12', '13','11']
  },
  13: {
    title: 'Logout',
    path: '/dashboard/logout',
    icon: getIcon('material-symbols:exit-to-app'),
    id: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13']
  },
  14: {
    title: 'Quality Assessment Form',
    path: '/dashboard/qualityAssessment',
    icon: getIcon('material-symbols:demography'),
    id: ['1', '2', '3', '4', '12', '13' ]
  },
  15: {
    title: 'Self Sakthi Program',
    path: '/dashboard/selfsakthiprogramdashboard',
    icon: getIcon("bx:female"),
    id: ['0', '1', '2', '3', '4',  '6', '7', '8', '9', '11', '12', '13']
  },
  16: {
    title: 'Gelathi Program',
    path: '/dashboard/gelathiprogramdashboard',
    icon: getIcon("foundation:torsos-all-female"),
    id: ['0', '1', '2', '3', '4','6','7', '8', '9', '11', '12','13']
  },
  24: {
    title: 'Nagarika Program',
    path: '/dashboard/nagarikaprogramdashboard',
    icon: getIcon("foundation:torsos-all-female"),
    id: ['0', '1', '2', '3', '4','6','7', '8', '9', '11', '12','13']
  },
  17: {
    title: 'Green Program',
    path: '/dashboard/greenprogramdashboard',
    icon: getIcon("noto-v1:man-farmer-dark-skin-tone" ),
    id: ['0', '1', '2', '3', '4', '6', '7', '8', '9', '11', '12', '13']
  },
  18: {
    title: 'Vyapar Program',
    path: '/dashboard/vyaparprogramdashboard',
    icon: getIcon("material-symbols:business-center-rounded"  ),
    id: ['0', '1', '2', '3', '4', '6', '7', '8', '9', '11', '12', '13']
  },
  19: {
    title: 'Funder Vyapar Program',
    path: '/dashboard/fundervyapardashboard',
    icon: getIcon("material-symbols:business-center-rounded" ),
    id: [ '8' ]
  },
  20: {
    title: 'Funder Green Program',
    path: '/dashboard/fundergreendashboard',
    icon: getIcon("noto-v1:man-farmer-dark-skin-tone" ),
    id: [ '8' ]
  },
  21: {
    title: 'Funder Self Shakthi Program',
    path: '/dashboard/funderselshaktidashboard',
    icon: getIcon("bx:female" ),
    id: [ '8' ]
  },
  22: {
    title: 'Funder Gelathi Program',
    path: '/dashboard/fundergelathidashboard',
    icon: getIcon("foundation:torsos-all-female"  ),
    id: [ '8' ]
  },
  23:{
    title: 'Material Stock List',
    path: '/dashboard/MaterialStockList',
    icon: getIcon('material-symbols:list-alt-outline-sharp'),
    id:['5']
  },
 


};
export default navConfig;