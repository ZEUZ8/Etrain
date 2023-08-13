import React, { useEffect, useState } from "react";
import { GetProgress } from "../../../axios/services/studentServices/studentServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFiletypePdf } from "react-icons/bs";
import html2pdf from "html2pdf.js";

const Progress = () => {
  const studentData = useSelector((state) => state.studentReducer);
  const token = studentData?.token;

  const errMsgs = ["Access Denied", "jwt malformed", "jwt expired"];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetProgress(token);
      if (errMsgs.some((msg) => msg === response.msgt || response?.message)) {
        navigate("/login");
      } else if (response) {
        setResults(response);
      }
    };
    fetchData();
  }, []);

  const downloadAsPDF = () => {
    const element = document.getElementById("card"); // Replace 'divId' with the actual id of your div
    const options = {
      filename: "download.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <div>
        <div>
          <div className="p-4 sm:ml-64 flex items-center align-middle ">
            <div className="text-3xl underline underline-offset-8 ">
              Student Progress
            </div>
            <div className="ml-2"></div>
          </div>

          <div class="p-4 sm:ml-64">
            <div
              id="card"
              class="p-4 border-2 border-gray-100  rounded-lg dark:border-gray-700"
            >
              <div class="flex px-6 items-center justify-between mb-4 rounded ">
                <div>
                  <img src="/img/logo.png" alt="logo" />
                </div>
                <div className="flex items-center ">
                  <p class="text-2xl italic underline underline-offset-4">
                    Progress Card
                  </p>
                  <BsFiletypePdf
                    onClick={downloadAsPDF}
                    className="cursor-pointer ml-5"
                  />
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="flex items-center justify-center rounded border border-gray-800 bg-orange-50">
                  <p class="text-md p-4 ">
                    Name : {results[0]?.studentId?.name}
                  </p>
                </div>
                <div class="flex items-center justify-center rounded border border-gray-800 bg-orange-50">
                  <p class="text-md p-4 ">
                    Grading Period : {results[0]?.examId?.examName}{" "}
                  </p>
                </div>
                <div class="flex items-center justify-center rounded border border-gray-800 bg-orange-50">
                  <p class="text-md p-4 ">School Year : {currentYear}</p>
                </div>
              </div>

              <div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-800">
                    <thead class="text-xs text-white uppercase bg-sky-400 ">
                      <tr>
                        <th scope="col" class="px-6 py-3 ">
                          Exams
                        </th>
                        <th scope="col" class="px-6 py-3">
                          English
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Science
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Mathematics
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Malayalam
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results?.map((data) => {
                        return (
                          <tr class="border-b  dark:border-gray-700">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {data?.examId?.examName}
                            </th>
                            <td class="px-6 py-4 text-gray-800">
                              {data?.english}
                            </td>
                            <td class="px-6 py-4 text-gray-800">
                              {data?.science}
                            </td>
                            <td class="px-6 py-4 text-gray-800">
                              {data?.mathematics}
                            </td>
                            <td class="px-6 py-4 text-gray-800">
                              {data?.malayalam}
                            </td>
                          </tr>
                        );
                      })}

                      {/* <tr class="border-b  dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          TotalMark
                        </th>
                        <td class="px-6 py-4 text-gray-800"></td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <table className="min-w-full bg-white border border-gray-300 mb-5">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Wrestler</th>
                    <th className="py-2 px-4 border-b">Signature Move(s)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      "Stone Cold" Steve Austin
                    </td>
                    <td className="py-2 px-4 border-b">
                      Stone Cold Stunner, Lou Thesz Press
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      Bret "The Hitman" Hart
                    </td>
                    <td className="py-2 px-4 border-b">The Sharpshooter</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">Razor Ramon</td>
                    <td className="py-2 px-4 border-b">
                      Razor's Edge, Fallaway Slam
                    </td>
                  </tr>
                </tbody>
              </table> */}

              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class=" rounded bg-sky-200 h-fit ">
                  <p class="text-md  font-bold p-5 ">Note : </p>
                  <p className="text-sm font-bold px-6 pb-4">
                    {results[0]?.note}
                  </p>
                </div>
                <div class="rounded bg-sky-200  h-fit">
                  <p class="text-2xl text-gray-500 font-light py-2 pt-5 px-10 ">
                    OVERALL GRADE
                  </p>
                  <p class="text-3xl font-bold  px-10 pb-4">
                    {results[0]?.grade}
                  </p>
                  {results[1]?.grade && (
                    <div className="flex pb-5 px-10  py-2 ">
                      <p class="text-2xl font-thin text-gray-500 ">
                        Last Year GRADE :
                      </p>
                      <p class="text-2xl font-bold text-gray-900 ">
                        {results[1]?.grade}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
