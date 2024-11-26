import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passRef = useRef();
  const [form, setForm] = useState({ site: "", usernm: "", pass: "", id:"" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    const req = await fetch("http://localhost:3000/")
    const pass = await req.json()
    setPasswordArray(pass)
  }

  useEffect(() => {
    getPasswords()
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/eye.png")) {
      passRef.current.type = "text";
      ref.current.src = "/hidden.png";
      ref.current.title = "hide";
      return;
    }
    passRef.current.type = "password";
    ref.current.title = "show";
    ref.current.src = "/eye.png";
  };

  const savePassword = async () => {
    if (form.site && form.usernm && form.pass) {
      const id = uuidv4()
      setPasswordArray([...passwordArray, {...form, id: id}])

      // For deleting items with similar id(for editing)
      await fetch("http://localhost:3000/", { method:"DELETE", headers:{ "Content-Type": "application/json" }, body: JSON.stringify({id: form.id }) });

      await fetch("http://localhost:3000/", { method:"POST", headers:{ "Content-Type": "application/json" }, body: JSON.stringify({...form, id:id }) });
  
      toast.success("Password added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setForm({ site: "", usernm: "", pass: "", id:"" })
    } else {
      toast.warn("Invalid credentials!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Confirm deleting password")
    if(c){
    setPasswordArray(passwordArray.filter(Item=>Item.id!==id))
    
    await fetch("http://localhost:3000/", { method:"DELETE", headers:{ "Content-Type": "application/json" }, body: JSON.stringify({id}) });

    toast("Password deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    }
  }

  const editPassword = (id) => {
    setForm({...passwordArray.filter(Item=>Item.id===id)[0], id:id})
    setPasswordArray(passwordArray.filter(Item=>Item.id!==id))
  }

  const copyPass = (text) => {
    toast("Copied to clipboard...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-fuchsia-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="md:container flex flex-col md:mx-auto m-2 md:w-[80%]">
        <h1 className="text-center font-bold text-2xl">
          <span className="text-green-600">&lt;</span>
          Pass
          <span className="text-green-600">Key/&gt;</span>
        </h1>
        <p className="text-sm text-center">Your own password manager</p>
        <div className="flex flex-col w-full text-xs md:text-base">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            name="site"
            className="mt-6 p-3 py-2 rounded-full border-green-500 border"
            placeholder="Enter Website URL"
          />
          <div className="flex mx-auto w-full">
            <input
              value={form.usernm}
              onChange={handleChange}
              type="text"
              name="usernm"
              className="mx-1 my-6 p-3 py-2 rounded-full border-green-500 border w-full"
              placeholder="Enter Username "
            />

            <div className="flex relative w-full">
              <input
                ref={passRef}
                value={form.pass}
                onChange={handleChange}
                type="text"
                name="pass"
                className="mx-1 my-6 p-3 py-2 rounded-full border-green-500 border w-full"
                placeholder="Enter Password"
              />
              <span
                className="absolute right-3.5 top-[2.1rem] size-4 md:size-6"
                onClick={showPassword}
                title=""
              >
                <img src="/eye.png" ref={ref} alt="404" />
              </span>
            </div>
          </div>
          <button
            className="border-black my-2 border rounded-full w-fit flex items-center justify-center gap-1 px-3 py-1 mx-auto bg-green-400 hover:bg-green-500 text-md"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#000000,secondary:#000000"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl m-3">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="ml-3">No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden text-xs md:text-base">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((Item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-32 border border-white">
                        <a href={Item.site} target="_blank">
                          {Item.site}
                        </a>
                      </td>
                      <td className="text-center w-32 border border-white">
                        {Item.usernm}
                      </td>
                      <td className="text-center w-32 border border-white">
                        <div className="flex justify-center items-center gap-1 md:gap-4">
                          {"*".repeat(Item.pass.length)}
                          <img
                            src="copy.png"
                            alt="copy"
                            className="w-3 md:w-4 cursor-pointer hover:bg-green-300 rounded-md mr-1"
                            title="copy"
                            onClick={() => {
                              copyPass(Item.pass);
                            }}
                          />
                        </div>
                      </td>
                      <td className="text-center w-32 border border-white ">
                        <img src="edit.svg" alt="edit" title="edit" onClick={()=>{editPassword(Item.id)}} className="w-4 md:w-5 mx-auto inline-block cursor-pointer hover:bg-green-300 rounded-md md:mr-2"/>
                        <img src="delete.svg" alt="delete" title="delete" onClick={()=>{deletePassword(Item.id)}} className="w-4 md:w-5 mx-auto inline-block cursor-pointer hover:bg-green-300 rounded-md ml-1"/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
