import React from "react";
import { Link } from "react-router-dom";

const LoadingPage = () => {
  return (
    <div>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0 ">
          <h1 className="text-4xl font-bold my-4 text-center">
            You can go to other pages from here
          </h1>

          <div className="grid grid-cols-2 gap-5 mt-8">
            <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
              <h1 className="text-slate-100 font-bold text-xl">
                Student Portal
              </h1>
              <div className="space-y-2 mt-4 flex flex-col">
                <Link className="link" to="/student">
                  Student Login
                </Link>
                <Link className="link" to="/register">
                  Student Registration
                </Link>
              </div>
            </div>
            <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
              <h1 className="text-slate-100 font-bold text-xl">Admin Portal</h1>
              <div className="space-y-2 mt-4 flex flex-col">
                <Link className="link" to="/admin">
                  Admin Login
                </Link>
              </div>
            </div>

            <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
              <h1 className="text-slate-100 font-bold text-xl">Admin Email</h1>
              <div className="space-y-2 mt-4 flex flex-col">
                <p>Email : admin@learningportal.com</p>
                <p>Password : lws@123456</p>
              </div>
            </div>

            <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
              <h1 className="text-slate-100 font-bold text-xl">
                Student Email
              </h1>
              <div className="space-y-2 mt-4 flex flex-col">
                <p>Email : saad.hasan@learningportal.com</p>
                <p>Password : lws@123456</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadingPage;
