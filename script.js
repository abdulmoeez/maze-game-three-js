var scene, camera, renderer, character, player, clock, forward, backward, right, left, playerVelocity = new THREE.Vector3(),id, clock, cameras = [], collision
var winningCube, winningCubeMesh = []
var playerGeometry
listenToPlayerMovements()
let array = [
  [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1],
  [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
  [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]
]
let ALL = []

function init(){
  clock = new THREE.Clock()

    scene = new THREE.Scene()
    let color = 0x605050

    scene.background = new THREE.Color(color)
    scene.fog = new THREE.Fog(color, 50, 100)
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.set(17, 40, 20)
    camera.rotation.x = -1.5


    renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(renderer.domElement)

    
    const planeGeometry = new THREE.PlaneBufferGeometry(200, 200);
    const planeMaterial = new THREE.MeshStandardMaterial();
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI/2
    scene.add(plane);

  const grid = new THREE.GridHelper(200, 80)
  scene.add(grid)

  // ADDING DIRECTIONAL LIGHT
  const light = new THREE.DirectionalLight(0xffffff, .3)
  light.position.set(0, 10, 0)
  scene.add(light)

  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
  scene.add(ambient);


  createMaze()
  addWinningBlock()
  addPlayer()

  animate();


}

function animate(){
    id = requestAnimationFrame(animate)
    renderer.render(scene, camera)
    movePlayer()
}

function createMaze(){
  const geometry = new THREE.BoxGeometry(1,1,1)
  const texture = new THREE.TextureLoader().load("textures/texture.jpg")
  const mesh = new THREE.MeshStandardMaterial( {
    map: texture
  })
  const cube = new THREE.Mesh(geometry, mesh)
  for(var i = 0;i < array.length; i++){
    for(var z = 0; z < array[i].length; z++){
      if(array[i][z] === 1){
        for(var y = 0; y < 3; y++){
          var clone = cube.clone()
          clone.position.set(z, y, i)
          ALL.push(clone)
          scene.add(clone)
        }
      }
    }
  }
}

function addWinningBlock(){
  const geometry = new THREE.BoxGeometry(2,2,2)
  const mesh = new THREE.MeshStandardMaterial( {color:0xff8000})
  winningCube = new THREE.Mesh(geometry, mesh)
  winningCubeMesh.push(winningCube)
  winningCube.position.set(17,0,1.2)
  scene.add(winningCube)
}

function addPlayer(){
  playerGeometry = new THREE.SphereGeometry(.35,32,32)
  const material = new THREE.MeshStandardMaterial({color: 0xffff00})
  player = new THREE.Mesh(playerGeometry, material)

  player.name = "player"
  player.position.set(5.4, .3, 32)
  scene.add(player)
}



function listenToPlayerMovements(){
  var onKeyDown = function(e){
    target = e.keyCode
    switch (target){
      case 87:
        forward = true
        break
      
      case 83:
        backward = true
        break

      case 65:
        left = true
        break
        
      case 68:
        right = true
        break
    }

  }

  var onKeyUp = function(e){
    target = e.keyCode
    switch (target){
      case 87:
        forward = false
        break
      
      case 83:
        backward = false
        break

      case 65:
        left = false
        break
        
      case 68:
        right = false
        break
    }
  }

  document.addEventListener("keyup", onKeyUp)
  document.addEventListener("keydown", onKeyDown)
}

function movePlayer(){
   dt = clock.getDelta();
  if(forward){
    playerVelocity.z = -1
  }

  if(backward){
    playerVelocity.z = 1
  }

  if(left){
    playerVelocity.x = -1
  }

  if(right){
    playerVelocity.x = 1
  }

  if(! (forward || backward || left || right)){
    playerVelocity.x = 0
    playerVelocity.z = 0
  }


  if(forward || backward || left || right){
    if(noCollision()){
        checkWin()
        player.translateX(playerVelocity.x * dt* 5)
        player.translateZ(playerVelocity.z * dt * 5)
    }
  }
}


function noCollision() {
  var cube = scene.getObjectByName('player');
  var originPoint = cube.position.clone();
  
  for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++) {
      var localVertex = cube.geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4(cube.matrix);
      var directionVector = globalVertex.sub(cube.position);

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var collisionResults = ray.intersectObjects(ALL);
      var collisionWinningBlock = ray.intersectObjects(winningCubeMesh)
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
          console.log(collisionResults[0].distance, directionVector.length())
            cancelAnimationFrame( id );
            gameOver(false)
            return false
        }else{
          return true
        }
      
  }
}


function checkWin(){
  if(player.position.x >= 16.8 && player.position.x <= 18 && player.position.z >= 1.2 && player.position.z <= 2.5){
    cancelAnimationFrame( id );
    gameOver(true)
  }
}
function gameOver(state){
  if(state){
    alert("Congrats, You won, now challenge your friends to see if they are as smart as you are to solve the maze, the game will reload in 5 seconds")
    setTimeout(()=>{
      window.location.reload()
    },5000)
  }else{
    alert("Ahh, the game got you.... Enjoy loosing or play again, the game will reload in 5 seconds")
    setTimeout(()=>{
      window.location.reload()
    },5000)
  }
 
}
document.addEventListener("DOMContentLoaded", (e)=>{
  // handle audio click
  document.addEventListener("click", (e)=>{
    if(e.target.id === 'audio-icon'){
      if(document.querySelector("audio").paused === true){
        document.querySelector(".audio-tag").innerHTML = `<i id='audio-icon' class="fas fa-volume-up"></i>`
        document.querySelector("audio").play()
      }else{
        document.querySelector(".audio-tag").innerHTML = `<i id='audio-icon' class="fas fa-volume-mute"></i>`
        document.querySelector("audio").pause()
      }
    }
  })

  document.querySelector(".startGame").addEventListener("click", (e)=>{
    document.querySelector(".audio-tag").style.display = 'block'
    document.querySelector("audio").play()
    document.querySelector(".starterContent").style.display = 'none'
    
    // starting music
    init()
  })
})

