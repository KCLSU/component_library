
export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}

export function createId(): string {
  return Math.random().toString(36).substr(2, 10);
};

export function returnDate(utcdate = ''){
  let date;
  if (utcdate) date = new Date(utcdate);
  else date = new Date();
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November','December'];

  return {
    weekday: days[date.getDay()],
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
    hours : date.getHours(),
    minutes : date.getMinutes()
  }
};

export function removeParams(src){
  let srcArray = src.split('');
  let newSrc = [];
  for(let i = 0; i < srcArray.length; i++){
    let queryBegin;
    if (srcArray[i] === '?'){
      queryBegin = 'found'
      break;
    }
    else if (queryBegin === 'found'){
      return;
    }
    else {
      newSrc.push(srcArray[i]);
    }
  }

  return newSrc.join('');
};



export function getNextEvents(dataList, length = -1){
  let data = [...dataList]
  let d = new Date();
  let ISOdate = d.toISOString();
  let dateIndex = data.findIndex(evt => {
      return evt.StartDate > ISOdate;
  });

  if (dateIndex < 0) return false;
  else if (length > 0) return data.slice(dateIndex,dateIndex + length)
  else return data.slice(dateIndex)
}

export function verifyCloudinaryApprovedUrl(url:string){
    let verified = false ;
    if (url.includes('https://www.kclsu.org/asset/News/6015/')) verified = true;
    return verified;
}

export function makeRequest< T extends {}>(url: string, type:any, data?:any) : Promise<T>{
  const payload: any = {
    method: type,
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  };

  return fetch(url, payload)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
}


//ACCEPTS AN ARRAY OF VALIDATABLE OBJECTS

// class Validatable {
//   constructor(
//     public name:string, 
//     public type: 'Email' | 'Required' | 'Number' | 'Date' | 'Regex',
//     public value: string | number | Date,
//     public regex?: RegExp
//     ){}
// }



// export function validate(){
//   const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
//   const em = document.getElementById('EmailAddress');
//   const requiredFields = document.querySelectorAll('.required');

//   let valid = true;
//   let error = '';
//   for(let x = 0; x < requiredFields.length; x++){
//     let field = requiredFields[x];
//     field.classList.remove('inputError');
//     if(!field.value){
//       field.classList.add('inputError');
//       valid = false;
//       error = 'Please fill in the red outlined boxes above.'
//     }
//   }

//   let emailValid = emailRegex.test(em.value);
//   if(!emailValid){
//     error = error + '\n Supply a valid email address';
//     valid = false;
//   }
//   if (!valid){
//     errorMessage.id= "errorMessage"
//     errorMessage.innerHTML = error;
//   }
//   return valid;
// }