export default async function ({ $auth, store, redirect, route }) {
  if ($auth.loggedIn != true && route.name != 'auth-login') {
    return redirect('/auth/login');
  }

  if ($auth.loggedIn == true) {
    // partner, senior 가져오기
    await store.dispatch('loadInitialData');
  }
}
