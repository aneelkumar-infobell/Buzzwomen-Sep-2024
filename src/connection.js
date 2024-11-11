import React, {useState, useEffect} from 'react';

export const NoInternetConnection = (props) => {
    // state variable holds the state of the internet connection
    const [isOnline, setOnline] = useState(true);

    // On initization set the isOnline state.
    useEffect(()=>{
        setOnline(navigator.onLine)
    },[])

    // event listeners to update the state 
    window.addEventListener('online', () => {
        setOnline(true)
    });

    window.addEventListener('offline', () => {
        setOnline(false)
    });

    const data = {
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
        3: {
          title: 'Main',
          path: '/dashboard/app',
          icon: getIcon('ic:baseline-home'),
          id: ['6', '13']
        },
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
          id: ['0', '1', '2', '3', '4',  '6', '7', '8', '9', '11', '12', '13']
        },
        24: {
          title: 'Nagarika Program',
          path: '/dashboard/nagarikaprogramdashboard',
          icon: getIcon("foundation:torsos-all-female"),
          id: ['0', '1', '2', '3', '4',  '6', '7', '8', '9', '11', '12', '13']
        },
        17: {
          title: 'Green Program',
          path: '/dashboard/greenprogramdashboard',
          icon: getIcon("noto-v1:man-farmer-dark-skin-tone" ),
          id: ['0', '1', '2', '3', '4', , '6', '7', '8', '9', '11', '12', '13']
        },
        18: {
          title: 'Vyapar Program',
          path: '/dashboard/vyaparprogramdashboard',
          icon: getIcon("material-symbols:business-center-rounded"  ),
          id: ['0', '1', '2', '3', '4', '6', '7', '8', '9', '11', '12', '13']
        },
        19: {
          title: ' Funder Vyapar Program',
          path: '/dashboard/fundervyapardashboard',
          icon: getIcon("material-symbols:business-center-rounded" ),
          id: [ '8' ]
        },
        20: {
          title: ' Funder Green Program',
          path: '/dashboard/fundergreendashboard',
          icon: getIcon("noto-v1:man-farmer-dark-skin-tone" ),
          id: [ '8' ]
        },
        21: {
          title: ' Funder Self Shakthi Program',
          path: '/dashboard/funderselshaktidashboard',
          icon: getIcon("bx:female" ),
          id: [ '8' ]
        },
        22: {
          title: ' Funder Gelathi Program',
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
       
        // 1:
        // {
        //   title: 'Main',
        //   path: '/dashboard/app',
        //   icon: getIcon("ic:baseline-home"),
        //   id: ['0', '1', '3', '7', '8', '9', '11','12']
        // },
        // 2: {
      
        //   title: 'Main',
        //   path: '/dashboard/trainer',
        //   icon: getIcon('ic:baseline-home'),
        //   id: ['5','11']
        // },
        // 3: {
        //   title: 'Main',
        //   path: '/dashboard/gelathi',
        //   icon: getIcon('ic:baseline-home'),
        //   id: ['6', '13']
        // },
        // 4: {
        //   title: 'Main',
        //   path: '/dashboard/operationmanager',
        //   icon: getIcon('ic:baseline-home'),
        //   id: ['4']
        // },
        // 5: {
        //   title: 'BusList',
        //   path: '/dashboard/buslist',
        //   icon: getIcon('mdi:bus-stop'),
        //   id: ['0', '1', '2', '3', '4', '5', '6', '9', '7', '8', '12','11']
        // },
        // 6: {
        //   title: 'Plan Of Action',
        //   path: '/dashboard/planofaction',
        //   icon: getIcon('mdi:clipboard-text'),
        //   id: ['0', '1', '3', '4', '5', '6', '7', '9', '8', '12', '13','11']
        // },
        // 7: {
        //   title: 'Projects',
        //   path: '/dashboard/projects',
        //   icon: getIcon('ic:baseline-library-books'),
        //   id: ['0', '1', '2', '3', '4', '5', '6', '7', '9', '8', '12', '13','11']
        // },
        // 8: {
        //   title: 'Self Sakthi Program',
        //   path: '/dashboard/selfsakthiprogramdashboard',
        //   icon: getIcon('material-symbols:exit-to-app'),
        //   id: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13']
        // },
        // 9: {
        //   title: 'Gelathi Program',
        //   path: '/dashboard/gelathiprogramdashboard',
        //   icon: getIcon('material-symbols:exit-to-app'),
        //   id: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13']
        // },
        // 10: {
        //   title: 'Green Program',
        //   path: '/dashboard/greenprogramdashboard',
        //   icon: getIcon('material-symbols:exit-to-app'),
        //   id: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13']
        // },
        // 11: {
        //   title: 'Vyapar Program',
        //   path: '/dashboard/vyaparprogramdashboard',
        //   icon: getIcon('material-symbols:exit-to-app'),
        //   id: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13']
        // },
      
        // 12: {
        //   title: 'People',
        //   path: '/dashboard/people',
        //   icon: getIcon('eva:people-fill'),
        //   id: ['0', '1', '2', '3', '4', '12','11']
        // },
        // 13: {
        //   title: 'Buzz Stock',
        //   path: '/dashboard/BuzzStock',
        //   icon: getIcon('ant-design:stock-outlined'),
        //   id: ['0', '1', '2', '3', '4', '12','11']
        // },
        // 14: {
        //   title: 'My Profile',
        //   path: '/dashboard/profile',
        //   icon: getIcon('mdi:user'),
        //   id: ['0', '1', '2', '3', '4', '5', '6', '9', '7', '8', '12', '13','11']
        // },
        // 15: {
        //   title: 'Demography',
        //   path: '/dashboard/demogrphy',
        //   icon: getIcon('material-symbols:demography'),
        //   id: ['0', '1', '3', '12','11']
        // },
        // 16: {
        //   title: 'Travel Allowance',
        //   path: '/dashboard/travel',
        //   icon: getIcon('mdi:wallet-travel'),
        //   id: ['0', '3', '4', '5', '6', '9', '7', '8', '12', '13','11']
        // },
        // 17: {
        //   title: 'Quality Assurance Form',
        //   path: '/dashboard/qualityAssurance',
        //   icon: getIcon('material-symbols:demography'),
        //   id: ['1', '2', '3', '4', '12', '13']
        // },
        // 18: {
        //   title: 'Logout',
        //   path: '/dashboard/logout',
        //   icon: getIcon('material-symbols:exit-to-app'),
        //   id: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13']
        // },
        
        
      
      };
    // if user is online, return the child component else return a custom component
    if(isOnline){
    return data
    } else {
        return data
    }
        
    
}

