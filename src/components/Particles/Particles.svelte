<script>
  import { pairs } from "../../store/teamStore";

  import { onMount } from "svelte";

  let ParticlesComponent;

  onMount(async () => {
    const module = await import("svelte-particles");

    ParticlesComponent = module.default;
  });

  let particlesConfig = {
    particles: {
      number: {
        value: 50,
      },
      fullscreen: {
        zIndex: -1,
      },
      color: {
        value: "#56ca8d",
      },
      links: {
        enable: true,
        color: "#56ca8d",
      },
      move: {
        enable: true,
      },
    },
  };

  let onParticlesLoaded = (event) => {
    const particlesContainer = event.detail.particles;

    // you can use particlesContainer to call all the Container class
    // (from the core library) methods like play, pause, refresh, start, stop
  };

  let onParticlesInit = (main) => {
    // you can use main to customize the tsParticles instance adding presets or custom shapes
  };
</script>

<svelte:component
  this={ParticlesComponent}
  id="tsparticles"
  options={particlesConfig}
  on:particlesLoaded={onParticlesLoaded}
  on:particlesInit={onParticlesInit}
/>
