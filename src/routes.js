import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';

import Blog from './pages/Blog';
import User from './pages/user/User';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/dashboard/DashboardApp';
import BusList from './pages/buses/BusList';
import BuzzStock from './pages/BuzzStock';
import Demography from './pages/Demography';
import PlanofAction from './pages/PlanofAction';
import TravelA from './pages/travelAllowance/TravelA';
import ProjectHome from './pages/projects/ProjectHome';
import AllProjects from './pages/projects/AllProjects';
import Project from './pages/projects/Project';
import ProjectProfile from './pages/projects/ProjectProfile';
import BusTest from './pages/projects/busTest';
import MaterialStockList from './pages/projects/materialsStockList';
import SelfShakthi from './pages/projects/selfShaktiProj';
import GelathiProgram from './pages/projects/gelathiProgram';
import EnrolledGelathi from './pages/projects/enrolledGelathi';
import EnrolledGreenMotivators from './pages/projects/enrolledGreenMotivators';
import EnrolledVyaapar from './pages/projects/enrolledVyaapar';
import GelathiCirces from './pages/projects/gelathiCircles';
import AssignedVillages from './pages/projects/assignedVillages';
import ScheduleBeehiveVisit from './pages/projects/scheduleBeehiveVisit';
import ScheduleCircleMeet from './pages/projects/scheduleCircleMeet';
import ScheduleVillage from './pages/projects/scheduleVillage';
import AssignBatches from './pages/projects/AssignBatches';
import DashboardHome from './pages/dashboard/DashboardHome';
import AssignTargets from './pages/projects/AssignTargets';
import QualityAssurance from './pages/qualityAssurance/QualityAssurance';
import Addbus from './pages/buses/Addbus';
import VyaparProgramDashboard from './pages/projects/ProgramDashboard/VyaparProgramDashboard';
import GreenProgramDashboard from './pages/projects/ProgramDashboard/GreenProgramDashboard';
import GelathiProgramDashboard from './pages/projects/ProgramDashboard/GelathiProgramDashboard';
import SelfSakthiQulityAssurance from './pages/qualityAssurance/SelfSakthiQulityAssurance';
import GreenProgramQualityAssurance from './pages/qualityAssurance/GreenProgramQualityAssurance';
import SelfSakthiByGelathi from './pages/qualityAssurance/SelfSakthiByGelathi';

import ProjectWiseGelathiCircle from './pages/projects/ProjectWiseGelathiCircle';
import FunderVyaparDashboard from './pages/projects/FunderDashBoard/FunderVyaparDashboard';
import FUnderGreenDashboard from './pages/projects/FunderDashBoard/FUnderGreenDashboard';
import FUnderSSDashboard from './pages/projects/FunderDashBoard/FUnderSSDashboard';
import FunderGelathiDashboard from './pages/projects/FunderDashBoard/FunderGelathiDashboard';
import Page404 from './pages/Page404';
import SeniorTrainerMaterialStocklist from './pages/SeniorTrainerMaterialStocklist';
// import BusCheckList from './pages/projects/SeniorTrainerBuschecklist';

// ----------------------------------------------------------------------

export default function Router() {

    const getProjectRoutes = [
        { path: '', element: <AllProjects />, exact: true, },
        { path: "project", element: <Project /> },
        { path: "busTest", element: <BusTest /> },
        // { path: 'buschecklist',element:<BusCheckList />},
        { path: "materialStock", element: <MaterialStockList /> },
        { path: "selfShakthi", element: <SelfShakthi /> },
        { path: "gelathiProgram", element: <GelathiProgram /> },
        { path:  "assignbatches",element:<AssignBatches/>},
        { path: "assigntargets",element:<AssignTargets/>},
        { path: "enrolledGelathi", element: <EnrolledGelathi /> },
        { path: "enrolledGreenMotivators", element: <EnrolledGreenMotivators /> },
        { path: "enrolledVyaapar", element: <EnrolledVyaapar /> },
        { path: "gelathiCirlces", element: <GelathiCirces /> },
        { path: "assignedVillages", element: <AssignedVillages /> },
        { path: "scheduleCircleMeet", element: <ScheduleCircleMeet /> },
        { path: "scheduleVillage", element: <ScheduleVillage /> },
        { path: "scheduleBeehiveVisit", element: <ScheduleBeehiveVisit /> },
        { path: "projectProfile", element: <ProjectProfile /> },
        { path: "addBuss", element: <Addbus /> },
         {path: "ProjectWiseGelathiCircle", element: <ProjectWiseGelathiCircle/>},

    ]


    const getRoutes =
        // [
        //  { path: 'app', element: <DashboardApp /> },
        //  { path: 'buslist', element: <BusList /> },
        //  { path: 'planofaction', element: <PlanofAction /> },
        //  // { path: 'projects', element: <Blog /> },
        //  { path: 'projects', element: <Project /> },
        //  { path: 'people', element: <User /> },
        //  { path: 'BuzzStock', element: <BuzzStock /> },
        //  { path: 'profile', element: <Profile /> },
        //  { path: 'travel', element: <TravelA /> },
        //  { path: 'demogrphy', element: <Demography /> },
        // ]

        [
            {
                path: 'app', element: <DashboardHome />, id: [0, 1, 3, 7, 8, 9, 12,11,4,5,6,13],
                children: [
                    { path: '', element: <DashboardApp />, exact: true },
                    // { path: 'chart', element: <Chart /> },
                ]
            },
            // // { path: 'trainer', element: <Trainerdashboard />, id: [5] },
            // { path: 'gelathi', element: <Gelathidashboard />, id: [6, 13] },
            // { path: 'operationmanager', element: <Operationmanagerdashboard />, id: [4]},
            // { path: 'operationmanager/chart', element: <Chart />, id: [4]},
            { path: 'buslist', element: <BusList />, id: [0, 1, 2, 3, 4, 5, 6, 7, 9, 8, 12,11] },
            { path: 'planofaction', element: <PlanofAction />, id: [0, 1, 3, 4, 5, 9, 6, 7, 8, 12, 13,11] },
            //  { path: 'projects', element: <Blog />,id=[1,2,3] },
            {
                path: 'projects', element: <ProjectHome />, id: [0, 1, 2, 3, 4, 5, 6, 7, 9, 8, 12, 13,11],
                children: getProjectRoutes
            },
            { path: 'people', element: <User />, id: [0, 1, 2, 3, 4, 12,11,5] },
            { path: 'MaterialStockList', element : <SeniorTrainerMaterialStocklist/>, id:[5]},
            { path: 'BuzzStock', element: <BuzzStock />, id: [0, 1, 2, 3, 4, 12,11,5] },
            { path: 'profile', element: <Profile />, id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13,11] },
            { path: 'travel', element: <TravelA />, id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13,11] },
            { path: 'demogrphy', element: <Demography />, id: [0, 1, 2, 3, 12,11] },
            { path: 'logout', element: <Logout />, id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] },
            { path: 'qualityAssessment',element: <QualityAssurance/>, id:[1,2,3,4,12,13]},
            { path : 'gelathiprogramdashboard' , element: <GelathiProgramDashboard/> , id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]},
            { path : 'greenprogramdashboard' , element: <GreenProgramDashboard/> , id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]},
            { path : 'vyaparprogramdashboard' , element: <VyaparProgramDashboard/> , id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]},
            {path : 'qualityAssessment/selfsakthi' , element :<SelfSakthiQulityAssurance/> ,id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]},
            {path : 'qualityAssurance/greenprogram' , element :<GreenProgramQualityAssurance/> ,id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]},
            {path : 'qualityAssurance/selfsakthibygelathi' , element :<SelfSakthiByGelathi/> ,id: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13]},
            {path : "fundervyapardashboard" , element : <FunderVyaparDashboard/> , id : [8]},
            {path:"fundergreendashboard", element:<FUnderGreenDashboard/> , id : [8]},
            {path:"funderselshaktidashboard", element:<FUnderSSDashboard/> , id : [8]},
            {path:"fundergelathidashboard", element:<FunderGelathiDashboard/> , id : [8]},
            {path:"addBus", element: <Addbus/>, id:[2]}
        ]


    const data = sessionStorage?.getItem('userId')
    return useRoutes([


        {
            path: '/',
            exact: true,
            element: <Login />,
        },
        {
            path: 'register',
            element: <Register />,
        },
        
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: getRoutes?.filter(itm => itm?.id.find(it => it == data))
        },

        {
            path: '/dashboard/logout',
            element: <Logout />,
        },
        // {
        //     path: '/dashboard/trainer',
        //     element: <Trainerdashboard />,
        // },
        // {
        //     path: '/dashboard/gelathi',
        //     element: <Gelathidashboard />,
        // },
        // {
        //     path: '/dashboard/operationmanager',
        //     element: <Operationmanagerdashboard />
        // },
        {
            path : '/dashboard/selfsakthiprogramdashboard',
            element : <selfSakthiProgramDashboard />
        },
        {
            path : '/dashboard/gelathiprogramdashboard',
            element : <gelathiProgramDashboard />
        },
        {
            path : '/dashboard/qualityAssurance',
            element : <QualityAssurance/>
        },
        
        {
            path : '/dashboard/greenprogramdashboard',
            element : <greenProgramDashboard />
        },
        ,
        {
            path : '/dashboard/vyaparprogramdashboard',
            element : <vyaparProgramDashboard />
        },
        {
            path: '/404',
            element:<Page404 /> ,
            // element : 
        },
     
        {
            path: '*',
            element: <Navigate to="/404" replace  />,
            // element : <Page404 />
        },
      
    ]);
}