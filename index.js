var url = "https://api.nationalize.io?name=";

let container=ele("div","container");
let row=ele("div","row");
var label=document.createElement("label");
label.setAttribute('for','key');
label.innerHTML="<h4>Enter the Name you want to search:</h4>";
var input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('id', 'key');
input.setAttribute('placeholder', 'Enter the Name');

let button = document.createElement("button");
button.setAttribute("type", "button");
button.className = "btn btn-primary";
button.innerHTML = "Submit";
button.addEventListener("click", foo);
let button1 = document.createElement("button");
button1.setAttribute("type", "button");
button1.className = "btn btn-danger";
button1.innerHTML = "reset";
button1.addEventListener("click", res );
row.append(label,input,button,button1);
container.append(row);
document.body.append(container);



async function foo() {
    try {
        let key = document.getElementById('key').value;
        let res = await fetch(`${url}${key}`);
        let res1=await res.json();
        console.log(res1);
        if(res1.country.length>2){
            temp=[];
            temp1=[];
            for(i=0;i<2;i++){
                temp.push(res1.country[i].country_id);
                temp1.push(res1.country[i].probability);
            }
            (`The top 2 countries where this name is used are: `);
            for(i=0;i<2;i++){
               colu=[];row1=[];
               colu[i]=col(key,temp[i],temp1[i]);
               row1[i]=ele("div","row");
               row1[i].append(colu[i]);
               container.append(row1[i]);
            }
        }
        else{
            let div=ele("div","error");
            div.innerHTML="Sorry!! your requested name seems to be not available in our API";
            container.append(div);
        }
    } catch (error) {
        console.log(error);
    }
}
function ele(element,classname){
    let elem=document.createElement(element);
    elem.setAttribute("class",classname);
    return elem;
}

function col(key,country,prob){
    let col=ele("div","col-sm-12");
    let card=ele("div","card");
    let cardh=ele("div","card-header bg-primary");
    let cardt=ele('h5',"card-title");
    cardt.innerHTML= key;
    let cardb=ele("div","card-body");
    cardb.innerHTML=`<ul>
    <li>Country name : ${country}</li>
    <li>probability of this name in this country: ${prob}</li>
    </ul>`;
    cardh.append(cardt);
    card.append(cardh,cardb);
    col.append(card);
    return col;
}

function res(){
    location.reload();
}