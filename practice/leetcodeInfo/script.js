// if it shows unable to fetch user data visit https://cors-anywhere.herokuapp.com/corsdemo and just click

const easycircle = document.getElementById('easy');
const mediumcircle = document.getElementById('medium');
const hardcircle = document.getElementById('hard');
const analytics = document.getElementById('analytics')
let input = document.getElementById('input');
let button = document.getElementById('search');

function Valid(username){
    if(username === ""){
        alert("Username should not be empty")
        return false;
    }

    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const ismatched = regex.test(username)
    if(!ismatched)
        alert("Enter a valid username")

    return ismatched;
}

function updateUI(total,done,circle){
    data = `${done}/${total}`;
    progress = (done/total)*100;
    newprog = `${progress}%`;

    let p = document.createElement('p');
    p.innerText = data;
    circle.appendChild(p);
    circle.style.setProperty('--prog',newprog)

}

function showData(parseddata) {
    const totalques = parseddata.data.allQuestionsCount[0].count;
    const totaleasyques = parseddata.data.allQuestionsCount[1].count;
    const totalmediumques = parseddata.data.allQuestionsCount[2].count;
    const totalhardques = parseddata.data.allQuestionsCount[3].count;
    
    const totaldone = parseddata.data.matchedUser.submitStats.acSubmissionNum[0].count;
    const totaleasydone = parseddata.data.matchedUser.submitStats.acSubmissionNum[1].count;
    const totalmediumdone = parseddata.data.matchedUser.submitStats.acSubmissionNum[2].count;
    const totalharddone = parseddata.data.matchedUser.submitStats.acSubmissionNum[3].count;

    updateUI(totaleasyques,totaleasydone,easycircle);
    updateUI(totalmediumques,totalmediumdone,mediumcircle);
    updateUI(totalhardques,totalharddone,hardcircle);

        
    // sticker submissions
    const submissions = [
        {
            difficulty : parseddata.data.matchedUser.submitStats.acSubmissionNum[0].difficulty,
            submissions : parseddata.data.matchedUser.submitStats.acSubmissionNum[0].submissions
        },
        {
            difficulty : parseddata.data.matchedUser.submitStats.acSubmissionNum[1].difficulty,
            submissions : parseddata.data.matchedUser.submitStats.acSubmissionNum[1].submissions
        },
        {
            difficulty : parseddata.data.matchedUser.submitStats.acSubmissionNum[2].difficulty,
            submissions : parseddata.data.matchedUser.submitStats.acSubmissionNum[2].submissions
        },
        {
            difficulty : parseddata.data.matchedUser.submitStats.acSubmissionNum[3].difficulty,
            submissions : parseddata.data.matchedUser.submitStats.acSubmissionNum[3].submissions
        }
    ]
    for(const values of submissions){
        let diff = values.difficulty;
        let sub = values.submissions;

        analytics.innerHTML += `
            <div class = 'card'>
            <div class = 'diff'> Difficulty : ${diff} </div>
            <div class = 'sub'> Submissions : ${sub} </div> 
            </div>
        `;
    }
}

async function fetchdata(username){
    button.textContent = 'Searching';
    button.disabled = true;
    try{
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const targeturl =  'https://leetcode.com/graphql' ;
    const finalurl = proxyurl+targeturl;
  
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const graphql = JSON.stringify({
    query: `
      query userSessionProgress($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              count
              submissions
              difficulty
            }
            totalSubmissionNum {
              count
              submissions
              difficulty
            }
          }
        }
      }
    `,
    variables: { "username": `${username}` }
  });
      
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow"
  };

    const response = await fetch(finalurl, requestOptions);
    if(!response.ok){
        throw new Error("Not able to fetch the User Data");
    }

    const data = await response.json();
    console.log("Data Received : " , data);
    showData(data);
  }
  catch(error){
    analytics.innerHTML = `<span> No data found associated with the user ${username} </span> Error -> ${error}`;
  }
  finally{
    button.textContent = 'Search';
    button.disabled = false;
  }
}

button.addEventListener('click',()=>{
    let username = input.value.trim();
    if(Valid(username)){
        const data = fetchdata(username)
    }
})

input.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter')
        button.click()
})





/*
logic 
 take username
 check validity
 fetch
 show
*/