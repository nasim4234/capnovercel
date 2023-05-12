import Reac from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import './components/css/style.css';
import './App.css';
import Home from './components/pages/home/home.js';
import Login from './components/pages/login/Login.js';
import Signup from './components/pages/signup/Signup.js';
import Configure from './components/pages//configure/Configure.js';
import Dashboard from './components/pages/dashboard/Dashboard.js';
import Demodatareport from './components/pages/demodatareport/Demodatareport.js';
import Uploadclientform from './components/pages/Uploadclientform/Uploadclientform.js';
import Bankform from './components/pages/bankform/Bankform.js';
import Editprofile from './components/pages/editprofile/Editprofile.js';
import Hardwareprofile from './components/pages/hardwareprofile/Hardwareprofile.js';
import Clientinformation from './components/pages/clientinformation/Clientinformation.js';
import Trainerinformation from './components/pages/trainerinformation/Trainerinformation.js';
import Createdata from './components/pages/createdata/Createdata';
import Privateroute from './components/component/Privateroute.js';
import CreatesaveDatasession from './components/pages/createdata/CreatesaveDatasession';
import Creategroupsessetionreportgodevice from './components/pages/viewdatareport/Creategroupsessetionreportgodevice';
import CreatesaveFilesession from './components/pages/createdatafile/Createdatafile';
import Viewpdfreport from './components/pages/viewpdfreport/Viewpdfreport';
import Viewdatareport from './components/pages/viewdatareport/Viewdatareport';
import Viewlive from './components/pages/viewlive/Viewlive';
import Viewmanageform from './components/pages/viewmanageform/Viewmanageform';
import Viewcreate from './components/pages/viewcreate/Viewcreate';
import Sectionreportassembly from './components/pages/sectionreportassembly/Sectionreportassembly';
import Subscriptionmanagement from './components/pages/subscriptionmanagement/Subscriptionmanagement';
import Gosubscriptionmanagement from './components/pages/subscriptionmanagement/Gosubscriptionmanagement';
import Recording from './components/pages/recording/Recording';
import Uploadtrainnerform from './components/pages/uploadtrainnerform/Uploadtrainnerform';
import Dropdown from './components/pages/Dropdown';
import Viewuploadedclientform from './components/pages/Uploadclientform/Viewuploadedclientform';
import Viewuploadedtrainerform from './components/pages/uploadtrainnerform/Viewuploadedtrainerform';
import Viewcompletedclientwork from './components/pages/viewcompletedclientwork/Viewcompletedclientwork';
import Editclient from './components/pages/clientinformation/Editclient';
import EditGoclient from './components/pages/clientinformation/EditGoclient';

import Edittrainer from './components/pages/trainerinformation/Edittrainer';
import Groupinformation from './components/pages/groupinformation/Groupinformation';
import Editgroupinformation from './components/pages/groupinformation/Editgroupinformation';
import Editgroup from './components/pages/groupinformation/Editgroup';
import Creategroupsessetionreport from './components/pages/viewdatareport/Creategroupsessetionreport.js';
import Createmultisession from './components/pages/viewdatareport/Createmultisession';
import Groupsessiondatareport from './components/pages/createdata/Groupsessiondatareport.js';
import Chart from './components/pages/chart/Chart';
import ExportChart from './components/pages/exportedchart/ExportedChart';
import ChartTable from './components/pages/chartTable/ChartTable';
import ChartExportedTable from './components/pages/chartexportedTable/ExportchartTable';
import SessiondataReport from './components/pages/viewdatareport/SessiondataReport';
import MultidataReport from './components/pages/viewdatareport/MultidataReport';
import Clienthomeworkdatareport from './components/pages/viewdatareport/Clienthomeworkdatareport';
import PdfsessionReport from './components/pages/viewpdfreport/PdfsessionReport';
import PdfmultisessionReport from './components/pages/viewpdfreport/PdfmultisessionReport';
import GroupsesstionReport from './components/pages/viewpdfreport/GroupsesstionReport';
import PdfclienthomeworkReport from './components/pages/viewpdfreport/PdfclienthomeworkReport';
import PdfsessetionreportNotes from './components/pages/viewpdfreport/PdfsessetionreportNotes';
import GoPdfsessetionreportNotes from './components/pages/viewpdfreport/GoPdfsessetionreportNotes';

import Assemblyreport from './components/pages/sectionreportassembly/Assemblyreport';
import Viewassemblyreport from './components/pages/sectionreportassembly/Viewassemblyreport';
import Privateroutelogin from './components/component/Privateroutelogin';
import Uploadhomeworkasignment from './components/pages/viewmanageform/Uploadhomeworkasignment';
import Addclient from './components/pages/clientinformation/Addclient';
import AddGoclient from './components/pages/clientinformation/AddGoclient';

import Addtrainer from './components/pages/trainerinformation/Addtrainer';
import Multilanguage from './components/component/Multilanguage';
import SubscriptionRenewal from './components/pages/subscriptionmanagement/SubscriptionRenewal';
import SubscriptionUpdate from './components/pages/subscriptionmanagement/SubscriptionUpdate';

import Chooseemail from './components/pages/choose/Chooseemail';
import List from './components/pages/list/List';
import SubscriptionRenewalGroup from './components/pages/subscriptionmanagement/SubscriptionRenewalGroup';
import SubscribedUsers from './components/pages/subscribedusers/SubscribedUsers';
import Editassemblyreport from './components/pages/sectionreportassembly/Editassemblyreport';
import ViewChartTable from './components/pages/chartTable/ViewChartTable';
import GroupChartTable from './components/pages/chartTable/GroupChartTable';
import ViewGroupChartTable from './components/pages/chartTable/ViewGroupChartTable';
import MultiChartTable from './components/pages/chartTable/MultiChartTable';
import Vieweditassemblyreport from './components/pages/sectionreportassembly/Vieweditassemblyreport';
import Mantainance from './components/pages/login/Mantainance';
import Viewgroupinformation from './components/pages/groupinformation/Viewgroupinformation';
import ResetPassword from './components/pages/resetpassword/ResetPassword';
import LoginComputer from './components/pages/login/LoginComputer';
import Godevicesessionsinglereport from './components/pages/viewdatareport/Godevicesessionsinglereport';
import Gopdfsessionreport from './components/pages/viewpdfreport/Gopdfsessionreport';
import Gosessionnote from './components/pages/viewlive/Gosessionnote';
import Gosessionimage from './components/pages/viewlive/Gosessionimage';
import Datareportsnotes from './components/pages/viewpdfreport/Datareportsnotes';
import Gozoomrecording from './components/pages/viewlive/Gozoomrecording';
import Goeditprofile from './components/pages/editprofile/Goeditprofile';
import Godashboard from './components/pages/Godashboard';
import Gopersonalsubscriptionmanagement from './components/pages/subscriptionmanagement/Gopersonalsubscriptionmanagement';
import Goclientinformation from './components/pages/clientinformation/Goclientinformation';
import Privacypolicy from './components/pages/Privacypolicy';
import Blank from './components/pages/createdata/Blank';
import Editclientprofile from './components/pages/editprofile/Editclientprofile';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<Privateroute />}>
					<Route path="/signup" element={<Signup />} />
					<Route path="/configure" element={<Configure />} />
					{/* <Route path="/dashboard" element={<Dashboard />} /> */}
					<Route path="/demodatareport" element={<Demodatareport />} />
					{/* <Route  path="/demodatafile" element={<Demodatafile />} /> */}
					<Route path="/upload/client/form" element={<Uploadclientform />} />
					<Route path="/blank-forms" element={<Bankform />} />
					<Route path="/hardware/profile" element={<Hardwareprofile />} />
					<Route path="/edit/client/:id" element={<Clientinformation />} />
					<Route path="/edit/go/client/:id" element={<Goclientinformation />} />
					<Route path="/edit/trainer/:trainerid" element={<Trainerinformation />} />
					<Route path="/choose/report/config" element={<CreatesaveDatasession />} />
					<Route path="/choose/exported/file/config" element={<CreatesaveFilesession />} />
					<Route path="/view/pdf/report" element={<Viewpdfreport />} />
					<Route path="/view/data/report" element={<Viewdatareport />} />
					<Route path="/view/live" element={<Viewlive />} />
					<Route path="/view/manageform" element={<Viewmanageform />} />
					<Route path="/viewcreate" element={<Viewcreate />} />
					<Route path="/addclient" element={<Addclient />} />
					<Route path="/case/report/assembly" element={<Sectionreportassembly />} />
					<Route path="/subscription/management" element={<Subscriptionmanagement />} />
					<Route path="/dropdown" element={<Dropdown />} />
					<Route path="/recording" element={<Recording />} />
					<Route path="/upload/trainer/form" element={<Uploadtrainnerform />} />
					<Route path="/view/uploaded/client/form" element={<Viewuploadedclientform />} />
					<Route path="/view/completed/client/work" element={<Viewcompletedclientwork />} />
					<Route path="/view/uploaded/trainer/form" element={<Viewuploadedtrainerform />} />
					<Route path="/list/client" element={<Editclient />} />
					<Route path="/edit/trainer" element={<Edittrainer />} />
					<Route path="/group/information" element={<Groupinformation />} />
					<Route path="/edit/group/information/:groupid" element={<Editgroupinformation />} />
					<Route path="/view/group/information/:groupid" element={<Viewgroupinformation />} />
					<Route path="/edit/group" element={<Editgroup />} />
					<Route path="/createmultisession" element={<Createmultisession />} />
					<Route path="/create/group/session/report" element={<Creategroupsessetionreport />} />
					<Route path="/group/session/data/report" element={<Groupsessiondatareport />} />
					<Route path="/chart" element={<Chart />} />
					<Route path="/exportchart" element={<ExportChart />} />
					<Route path="/view/multi/report/:showclock/:reportId" element={<MultiChartTable />} />
					<Route path="/create/group/report/:showclock/:config/:session/:record/:currentConfig" element={<GroupChartTable />} />
					<Route path="/create/report/:showclock/:config/:session/:record/:currentConfig" element={<ChartTable />} />
					<Route path="/view/report/:showclock/:session/:reportId/:record" element={<ViewChartTable />} />
					<Route path="/view/group/report/:showclock/:session/:reportId/:record" element={<ViewGroupChartTable />} />
					<Route path="/create/exported/report/:config" element={<ChartExportedTable />} />
					<Route path="/session/data/report/:type" element={<SessiondataReport />} />
					<Route path="/multidata/report" element={<MultidataReport />} />
					<Route path="/client/homework/datareport" element={<Clienthomeworkdatareport />} />
					<Route path="/pdf/session/data/report/:pdftype" element={<PdfsessionReport />} />
					<Route path="/pdf/multisession/report" element={<PdfmultisessionReport />} />
					<Route path="/group/sesstion/report" element={<GroupsesstionReport />} />
					<Route path="/pdf/client/homework/report" element={<PdfclienthomeworkReport />} />
					<Route path="/pdf/sessetion/report/notes" element={<PdfsessetionreportNotes />} />
					<Route path="/assemblyreport" element={<Assemblyreport />} />
					<Route path="/view/assembly" element={<Viewassemblyreport />} />
					<Route path="/view/edit/assemblyreport/:vid" element={<Vieweditassemblyreport />} />
					<Route path="/upload/homework/asignment" element={<Uploadhomeworkasignment />} />
					<Route path="/add/trainer" element={<Addtrainer />} />
					<Route path="/multilanguage" element={<Multilanguage />} />
					<Route path="/dashboard" element={<Createdata />} />
					<Route path="/edit/client/profile" element={<Editclientprofile />}></Route>
					<Route path="/" element={<Blank />} />
					
					{/* 
				<Route path="/add/list" element={<Chooseemail />} />
				<Route path="/" element={<List />} />
				<Route path="/subscribe/user" element={<SubscribedUsers />} />
				 */}
				
					<Route path="/edit/assembly/report/:id" element={<Editassemblyreport />} />
					<Route path="/edit/profile" element={<Editprofile />} />


					{/* Go user routes */}
					<Route path="/go/choose/report/config" element={<Creategroupsessetionreportgodevice />} />
					<Route path="/go/data/reports/notes" element={<Datareportsnotes />} />
					<Route path="/go/session/note" element={<Gosessionnote />} />
					<Route path="/go/session/image" element={<Gosessionimage />} />
					<Route path="/go/zoom/recording" element={<Gozoomrecording />} />
					<Route path="/go/add/client" element={<AddGoclient />} />
					<Route path="/go/basic/subscription/management" element={<Gosubscriptionmanagement />} />
					<Route path="/go/list/client" element={<EditGoclient />} />
					<Route path="/go/device/session/single/report" element={<Godevicesessionsinglereport />} />
					<Route path="/go/pdf/session/report" element={<Gopdfsessionreport />} />
					<Route path="/go/pdf/session/report/notes" element={<GoPdfsessetionreportNotes />} />
					<Route path="/go/edit/profile" element={<Goeditprofile />} />
					<Route path="/go/dashboard" element={<Godashboard />} />
					<Route path="/go/personal/subscription/management" element={<Gopersonalsubscriptionmanagement />} />
					
					
					{/* Go user routes */}

					
				</Route>

				<Route path="" element={<Privateroutelogin />}>
					<Route path="/login" element={<Login />} />
					<Route path="/setlogin/:access" element={<LoginComputer />} />
					{/* <Route path="/login" element={<Mantainance />} /> */}
				</Route>
				<Route path="/reset/password/:token" element={<ResetPassword />} />
				<Route path="/privacy-policy" element={<Privacypolicy />} />
				<Route path="/subscription/renew" element={<SubscriptionRenewal />} />
				<Route path="/subscription/update/:type" element={<SubscriptionUpdate />} />
					<Route path="/subscription/renew/group/:userid" element={<SubscriptionRenewalGroup />} />

			</Routes>
		</BrowserRouter>
	)
}

export default App;
