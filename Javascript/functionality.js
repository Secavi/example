var equipmentId=1;
var selectorStyle=
	"position:absolute;"+
	"top:0px;"+
	"left:0px;"+
	"cursor:pointer;"+
	"-webkit-box-sizing: content-box;"+
	"-moz-box-sizing: content-box;"+
	"box-sizing: content-box;"+
	"width: 10px;"+
	"height: 10px;"+
	"margin: 1px;"+
	"border: 2px solid rgba(0,0,0,1);"+
	"-webkit-border-radius: 50%;"+
	"border-radius: 50%;"+
	"color: rgba(0,0,0,1);"+
	"white-space: nowrap;"+
	"background: rgba(255,255,255,0);"+
	"-webkit-touch-callout: none;"+
	"-webkit-user-select: none;"+
	"-khtml-user-select: none;"+
	"-moz-user-select: none;"+
	"-ms-user-select: none;"+
	"user-select: none;";
	
	
function closeFunction(_element)
{
	var disconnector_id;
	var disconnector_pos;
	var disconnector_moving;
	var timer_id;
	var operation_time; //Operation time of the disconnector in seconds
	var mcb_indication;
	var i;	
	for(i=0 ; i < _element.children.length ; i++)
	{
		if(_element.children[i].name=="disconnectorId")
			disconnector_id=_element.children[i].value;
		if(_element.children[i].name=="disconnectorPosition")
			disconnector_pos=i;
		if(_element.children[i].name=="disconnectorMoving")
			disconnector_moving=i;
		if(_element.children[i].name=="operationTime")
			operation_time=i;
		if(_element.children[i].name=="mcbIndication")
			mcb_indication=i;
	}
	//document.getElementById("test").innerHTML = _element.id;
	if(_element.children[disconnector_moving].value==0 && _element.children[mcb_indication].value==1)
	{
		_element.children[disconnector_moving].value=1;
		timer_id= setInterval(frame, 20);
		function frame() 
		{
			_element.children[disconnector_pos].value=Number(_element.children[disconnector_pos].value)+Number((0.02*90)/_element.children[operation_time].value);
			if(_element.children[disconnector_pos].value>=90)
			{
				_element.children[disconnector_pos].value=90;
				clearInterval(timer_id);
				_element.children[disconnector_moving].value=0;
			}
			
			document.getElementById("disconnector"+disconnector_id).style.transform = 'rotate(' + _element.children[disconnector_pos].value + 'deg)' ; 
			
			update_position(disconnector_id,_element.children[disconnector_pos].value);
		}
	}
}

function openFunction(_element)
{
	var disconnector_id;
	var disconnector_pos;
	var disconnector_moving;
	var timer_id;
	var operation_time; //Operation time of the disconnector in seconds
	var mcb_indication;
	var i;
	for(i=0 ; i < _element.children.length ; i++)
	{
		if(_element.children[i].name=="disconnectorId")
			disconnector_id=_element.children[i].value;
		if(_element.children[i].name=="disconnectorPosition")
			disconnector_pos=i;
		if(_element.children[i].name=="disconnectorMoving")
			disconnector_moving=i;
		if(_element.children[i].name=="operationTime")
			operation_time=i;
		if(_element.children[i].name=="mcbIndication")
			mcb_indication=i;
	}
	if(_element.children[disconnector_moving].value==0 && _element.children[mcb_indication].value==1)
	{
		_element.children[disconnector_moving].value=1;
		timer_id = setInterval(frame, 20);
		function frame()
		{
			_element.children[disconnector_pos].value=Number(_element.children[disconnector_pos].value)-Number((0.02*90)/_element.children[operation_time].value);
			if(_element.children[disconnector_pos].value<=0)
			{
				_element.children[disconnector_pos].value=0;
				clearInterval(timer_id);
				_element.children[disconnector_moving].value=0;
			}
			document.getElementById("disconnector"+disconnector_id).style.transform = 'rotate(' + _element.children[disconnector_pos].value + 'deg)' ; 
			update_position(disconnector_id,_element.children[disconnector_pos].value);
		}
	}
}

function update_position(disconnector_id,disconnector_pos){
	if(disconnector_pos==0){
		document.getElementById("s_open"+disconnector_id).style.background= 'rgba(0,0,0,1)';
		document.getElementById("s_closed"+disconnector_id).style.background= 'rgba(255,255,255,0)';
	}else{
		if(disconnector_pos==90){
			document.getElementById("s_open"+disconnector_id).style.background= 'rgba(255,255,255,0)';
			document.getElementById("s_closed"+disconnector_id).style.background= 'rgba(0,0,0,1)';
		}else{
			document.getElementById("s_open"+disconnector_id).style.background= 'rgba(0,0,0,0)';
			document.getElementById("s_closed"+disconnector_id).style.background= 'rgba(0,0,0,0)';
		}
	}
}

function mcb_function(disconnector_id){
	if(mcb_indication==0){
		document.getElementById("s_mcb_trip"+disconnector_id).style.background= 'rgba(255,255,255,0)';
		mcb_indication=1;
	}else{
		stop_movement();
		document.getElementById("s_mcb_trip"+disconnector_id).style.background= 'rgba(0,0,0,1)';
		mcb_indication=0;
	}
}

function updateElement(_element,id){
	var i;
	for(i=0;i<_element.children.length;i++)
	{
		if(_element.children[i].name == "disconnectorId")
			_element.children[i].value = id;
		if(_element.children[i].id == "tittle")
			_element.children[i].innerHTML="Disc " +id;
		if(_element.children[i].id != "")
			_element.children[i].id = _element.children[i].id + id;
		if(_element.children[i].children.length>0)
			updateElement(_element.children[i],id)
	}
}

function allowDrop(ev) {
  /* The default handling is to not allow dropping elements. */
  /* Here we allow it by preventing the default behaviour. */
  ev.preventDefault();
}

function drag(ev) {
  /* Here is specified what should be dragged. */
  /* This data will be dropped at the place where the mouse button is released */
  /* Here, we want to drag the element itself, so we set it's ID. */
  ev.dataTransfer.setData("text/html", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var dropElement=document.getElementById("content");
	var dropsidebarL=document.getElementById("sidebarL");
	var data=ev.dataTransfer.getData("text/html");
	
	var node1=document.createElement("div");
	//var textnode = document.createTextNode("Water");
	//node1.appendChild(textnode);
	node1.className="selector";
	node1.id="s_open"+equipmentId;
	node1.onclick="mcb_function(this.parentNode)";
	//node1.style=selectorStyle;
	
	var node2=document.createElement("div");
	node2.className="selectorText";
	node2.style=
	"font: normal 12px/1 'Times New Roman', Times, serif;"+
	"position:absolute;"+
	"top:0px;"+
	"left:20px;";
	node2.innerHTML="Disconnector Open";
	
	var node3=document.createElement("div");
	node3.onclick="mcb_function(this.parentNode)";
	node3.style=
	"position:relative;"+
	"width: 200px;"+
	"height: 15px;"+
	"cursor:default;";
	node3.appendChild(node1);
	node3.appendChild(node2);
	
	/* If you use DOM manipulation functions, their default behaviour it not to 
	 copy but to alter and move elements. By appending a ".cloneNode(true)", 
	 you will not move the original element, but create a copy. */
	var nodeCopy = document.getElementById(data).cloneNode(true);
	nodeCopy.id = "box"+equipmentId; /* We cannot use the same ID */
	nodeCopy.draggable = "false";
	nodeCopy.ondragstart="";
	nodeCopy.style.position="absolute";
	nodeCopy.style.top=200*Math.floor((dropElement.children.length/4))+"px";
	nodeCopy.style.left=200*(dropElement.children.length-(4*Math.floor(dropElement.children.length/4)))+"px";
	if(nodeCopy.children.length>0)
		updateElement(nodeCopy,equipmentId);
		
	equipmentId = equipmentId+1;
	dropsidebarL.appendChild(node3);
	dropElement.appendChild(nodeCopy);
}

function openForm() {
	document.getElementById("myForm").style.display = "block";
}

function closeForm() {
	document.getElementById("myForm").style.display = "none";
}