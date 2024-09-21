<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import CreatePostForm from "$lib/CreatePostForm.svelte";

  import type { PageData } from "./$types";
  import type { Post as DbPost, Sphere } from "@prisma/client";
  import Post from "$lib/Post.svelte";
  import CreateSphereForm from "$lib/CreateSphereForm.svelte";
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
        timeOrderedPosts.push({ post: post, owned: true });
      }
    }
  }
  for (const sphere of allowedSpheres) {
    for (const post of sphere.posts) {
      if (post) {
        timeOrderedPosts.push({ post: post, owned: false });
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
</script>

<Navbar {username} />
<main>
  <h1>Origin</h1>
  <div>
    <div class="upper">
      <div class="flex">
        {#if !userSpheresExists}
          <h2>Make your first Sphere!</h2>
        {:else}
          <div class="yourSpheres">
            <h3>Your Spheres</h3>
            {#each userSpheres as sphere}
              <p>{sphere.name}</p>
            {/each}
          </div>
        {/if}
        <CreateSphereForm />
      </div>
      <div>
        {#if userSpheresExists}
          <CreatePostForm spheres={userSpheres} />
        {/if}
      </div>
    </div>
    <div class="posts">
      {#each timeOrderedPosts as p}
        <Post
          owned={p.owned}
          title={p.post.title}
          content={p.post.content}
          id={p.post.id}
          sphereName={sphereIdToName.get(p.post.sphereId)}
        />
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    display: block;
  }

  h2 {
    margin: auto;
    padding: 0 5%;
  }

  div {
    margin: auto;
  }

  .yourSpheres {
    display: inline-block;
    padding: 0 5%;
  }
  .upper {
    display: flex;
    padding-bottom: 1%;
  }
  .flex {
    display: flex;
  }
  .posts {
    display: block;
    margin: 0 auto;
    width: 100%;

    overflow-x: auto;
    overflow-y: auto;
  }
</style>
