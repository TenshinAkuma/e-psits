export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (to.path.startsWith("/admin")) {
    if (!user.value) {
      return navigateTo("/signIn");
    }
  }
});
