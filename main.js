
    // Setup
    const canvas = document.getElementById('canvas3d');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    
    // Create cube
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x667eea });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    camera.position.z = 8;
    
    // Scroll handling
    let scrollPercent = 0;
    
    function onScroll() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollPercent = scrollTop / scrollHeight;
        
        // Hide scroll indicator after scrolling
        if (scrollTop > 100) {
            document.getElementById('scrollIndicator').style.opacity = '0';
        } else {
            document.getElementById('scrollIndicator').style.opacity = '0.6';
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate cube based on scroll (one full rotation = 2 * PI)
        cube.rotation.y = scrollPercent * Math.PI * 2;
        cube.rotation.x = scrollPercent * Math.PI * 2;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });