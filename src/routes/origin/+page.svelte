<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import SphereDisplay from "$lib/SphereDisplay.svelte";
  import CreatePostForm from "$lib/CreatePostForm.svelte";
  import Post from "$lib/Post.svelte";
  import CreateSphereForm from "$lib/CreateSphereForm.svelte";

  import type { PageData } from "./$types";

  export let data: PageData;

  let username = data.username;
  let userSpheres = data.userSpheres ? data.userSpheres : [];
  let userSpheresExists = userSpheres.length !== 0;

  let allowedSpheres = data.allowedSpheres
    ? data.allowedSpheres.allowedSpheres
    : [];

  let sphereIdToName = new Map<number, string>();
  for (const sphere of userSpheres) {
    sphereIdToName.set(sphere.id, sphere.name);
  }
  for (const sphere of allowedSpheres) {
    sphereIdToName.set(sphere.id, sphere.name);
  }

  let timeOrderedPosts = [];
  for (const sphere of userSpheres) {
    for (const post of sphere.posts) {
      if (post) {
        timeOrderedPosts.push({ post: post, owned: true, author: username });
      }
    }
  }
  for (const sphere of allowedSpheres) {
    for (const post of sphere.posts) {
      if (post) {
        timeOrderedPosts.push({
          post: post,
          owned: false,
          author: post.user.name,
        });
      }
    }
  }
  timeOrderedPosts.sort((a, b): number => {
    if (a.post && b.post && a.post.createTime && b.post.createTime) {
      return a.post.createTime.getTime() - b.post.createTime.getTime();
    } else if (a) {
      return -1;
    } else if (b) {
      return 1;
    } else {
      return 0;
    }
  });

  const getSphereName = (id: number): string => {
    const name = sphereIdToName.get(id);
    if (name) {
      return name;
    }
    return "";
  };
</script>

<Navbar {username} />
<main>
  <h1>Origin</h1>
  <div>
    <div class="upper">
      {#if !userSpheresExists}
        <h2>Make your first Sphere!</h2>
      {:else}
        <SphereDisplay spheres={userSpheres} />
      {/if}
      {#if userSpheresExists}
        <CreatePostForm spheres={userSpheres} />
      {/if}
      <CreateSphereForm />
    </div>
    <div class="posts">
      {#each timeOrderedPosts as p}
        <Post
          owned={p.owned}
          author={p.author}
          title={p.post.title}
          content={p.post.content}
          id={p.post.id}
          sphereName={getSphereName(p.post.sphereId)}
        />
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    display: block;
  }

  h1 {
    text-align: center;
  }

  h2 {
    margin: auto;
    padding: 0 5%;
  }

  div {
    margin: 0 auto;
  }

  .upper {
    display: flex;
    padding-bottom: 1%;
  }

  .posts {
    display: block;
    margin: 0 auto;

    overflow-x: auto;
    overflow-y: auto;
  }
</style>
