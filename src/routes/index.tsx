import { Suspense, lazy } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// layouts
// import DashboardLayout from '../layouts/dashboard';
// import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
// import GuestGuard from '../guards/GuestGuard';
// import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
// import { PATH_AFTER_LOGIN } from '../config';
// components
import Page404 from '@/pages/common/Page404';
import Page500 from '@/pages/common/Page500';
import LoadingScreen from '@components/LoadingScreen';

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '',
      element: <Chat />
    },
    {
      path: 'chat',
      element: <Chat />
    },
    {
      path: 'langchain',
      element: <LangChain />
    },
    {
      path: '*',
      // element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

// AUTHENTICATION
const Chat = Loadable(lazy(() => import('@pages/ChatPage')));
const LangChain = Loadable(lazy(() => import('@/pages/LangChainPage')));




// {
//   path: 'auth',
//   children: [
//     // {
//     //   path: 'login',
//     //   element: (
//     //     <GuestGuard>
//     //       <Login />
//     //     </GuestGuard>
//     //   ),
//     // },
//     // {
//     //   path: 'register',
//     //   element: (
//     //     <GuestGuard>
//     //       <Register />
//     //     </GuestGuard>
//     //   ),
//     // },
//     { path: 'login-unprotected', element: <Login /> },
//     { path: 'register-unprotected', element: <Register /> },
//     { path: 'reset-password', element: <ResetPassword /> },
//     { path: 'verify', element: <VerifyCode /> },
//   ],
// },

// Dashboard Routes
// {
//   path: 'dashboard',
//   element: (
//     <AuthGuard>
//       <DashboardLayout />
//     </AuthGuard>
//   ),
//   children: [
//     { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
//     { path: 'app', element: <GeneralApp /> },
//     { path: 'ecommerce', element: <GeneralEcommerce /> },
//     { path: 'analytics', element: <GeneralAnalytics /> },
//     { path: 'banking', element: <GeneralBanking /> },
//     { path: 'booking', element: <GeneralBooking /> },

//     {
//       path: 'e-commerce',
//       children: [
//         { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
//         { path: 'shop', element: <EcommerceShop /> },
//         { path: 'product/:name', element: <EcommerceProductDetails /> },
//         { path: 'list', element: <EcommerceProductList /> },
//         { path: 'product/new', element: <EcommerceProductCreate /> },
//         { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
//         { path: 'checkout', element: <EcommerceCheckout /> },
//       ],
//     },
//     {
//       path: 'user',
//       children: [
//         { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
//         { path: 'profile', element: <UserProfile /> },
//         { path: 'cards', element: <UserCards /> },
//         { path: 'list', element: <UserList /> },
//         { path: 'new', element: <UserCreate /> },
//         { path: ':name/edit', element: <UserCreate /> },
//         { path: 'account', element: <UserAccount /> },
//       ],
//     },
//     {
//       path: 'invoice',
//       children: [
//         { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
//         { path: 'list', element: <InvoiceList /> },
//         { path: ':id', element: <InvoiceDetails /> },
//         { path: ':id/edit', element: <InvoiceEdit /> },
//         { path: 'new', element: <InvoiceCreate /> },
//       ],
//     },
//     {
//       path: 'blog',
//       children: [
//         { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
//         { path: 'posts', element: <BlogPosts /> },
//         { path: 'post/:title', element: <BlogPost /> },
//         { path: 'new', element: <BlogNewPost /> },
//       ],
//     },
//     {
//       path: 'mail',
//       children: [
//         { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
//         { path: 'label/:customLabel', element: <Mail /> },
//         { path: 'label/:customLabel/:mailId', element: <Mail /> },
//         { path: ':systemLabel', element: <Mail /> },
//         { path: ':systemLabel/:mailId', element: <Mail /> },
//       ],
//     },
//     {
//       path: 'chat',
//       children: [
//         { element: <Chat />, index: true },
//         { path: 'new', element: <Chat /> },
//         { path: ':conversationKey', element: <Chat /> },
//       ],
//     },
//     { path: 'calendar', element: <Calendar /> },
//     { path: 'kanban', element: <Kanban /> },
//   ],
// },

// const Register = Loadable(lazy(() => import('../pages/auth/Register')));
// const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
// const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// Chat

// GENERAL
// const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
// const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
// const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
// const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
// const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// // ECOMMERCE
// const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
// const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
// const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
// const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
// const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// // INVOICE
// const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
// const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
// const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
// const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// // BLOG
// const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
// const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
// const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// // USER
// const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
// const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
// const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
// const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
// const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// // APP
// const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
// const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
// const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
// const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// // MAIN
// const HomePage = Loadable(lazy(() => import('../pages/Home')));
// const About = Loadable(lazy(() => import('../pages/About')));
// const Contact = Loadable(lazy(() => import('../pages/Contact')));
// const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
// const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
// const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
// const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
// const Payment = Loadable(lazy(() => import('../pages/Payment')));
// const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// const NotFound = Loadable(lazy(() => import('../pages/Page404')));
