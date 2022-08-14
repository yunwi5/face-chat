// Returns uid from the sessionStorage.
// Or, generate new uid if there is none.
export function getRandomUid() {
    let uid = sessionStorage.getItem('uid');
    if (!uid) {
        uid = String(Math.floor(Math.random() * 10000));
        sessionStorage.setItem('uid', uid);
    }
    return uid;
}
