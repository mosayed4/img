const api = "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";
const api0 = "s4uy6U1LvdtkkrXfk2v7T3BlbkFJG3wbkUVnjfTLSM0aaalV";
const app = "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";

const inp = document.getElementById("inp");
const images = document.querySelector(".images");

// const getImage = async ()=> {
//     const methods = {
//         method:"POST",
//         headers:{
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${api}`,
//         },
//         body:JSON.stringify({
//             "prompt" : inp.value,
//             "n":4,
//             "size": "256x256"

//          }),

//      }
//     const res = await fetch ("https://api.openai.com/v1/images/generations" ,methods)
// const data = await  res.json()
// console.log(data)
// }
const getImage = async () => {
  try {
    // نفترض أن inp هو عنصر إدخال، تأكد من أن لديه قيمة
    const inputValue = inp.value;
    if (!inputValue) {
      console.error("قيمة الإدخال فارغة");
      return;
    }

    const methods = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api}`,
      },
      body: JSON.stringify({
        prompt: inputValue,
        n: 3,
        size: "256x256",
      }),
    };

    const res = await fetch(
      "https://api.openai.com/v1/images/generations",
      methods
    );

    const data = await res.json();

    if (data?.data) {
      const listImages = data?.data;
      listImages.map((photo) => {
        const container = document.createElement("div");
        images.append(container);
        const img = document.createElement("img");
        container.append(img);
        img.src = photo?.url;
        console.log(photo?.url);
      });
      console.log(data.data);
    } else {
      throw new Error(`خطأ في الاتصال بالخادم! الحالة: ${res}`);
    }
  } catch (error) {
    console.error("حدث خطأ:", error);
  }
};
