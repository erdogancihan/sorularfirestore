//import { actionTypes } from "redux-firestore";
import { Success, Failure } from "./userActions";
import { actionTypes } from "redux-firestore";

export const errorMessage = (error, getState) => {
  console.log(error);
  switch (error.code) {
    case "auth/invalid-email":
      return "Girdiğiniz Eposta adresi geçersiz.";
    case "auth/invalid-password":
      return "Girdiğiniz şifre geçersiz. En az altı karakter uzunluğunda bir şifre giriniz.";
    case "auth/maximum-user-count-exceeded":
      return "Maksimum kullanıcı sayısı aşıldı.";
    case "auth/email-already-exists":
      return "Girdiğiniz Eposta adresi başka bir kullanıcı tarafından kullanıyor. Her kullanıcının benzersiz bir Eposta adresi olması gerekir.";
    case "auth/user-not-found":
      return "Girdiğiniz kullanıcı adı ile eşleşen kayıtlı bir kullanıcı bulunmamaktadır.";
    case "auth/internal-error":
      return "Kimlik doğrulama sunusunda tanımlanamyan bir hata oluştu.";
    case "auth/network-request-failed":
      return "Ağ hatası (zaman aşımı, bağlantıda kesiklik veya ulaşılamayan sunucu) oluştu.";
    case "auth/wrong-password":
      return "Şifre hatalı";
    case "auth/email-already-in-use":
      return "Eposta adresi başka bir kullanıcı tarafından kullanılmaktadır.";
    case "auth/weak-password":
      return "Şifre en az 6 karakter uzunluğunda olmalıdır.";
    case "emailNotVerified":
      return "Eposta adresiniz doğrulanmadı. Lütfen posta kutunuzu kontrol edin ve Eposta adresinizi doğrulayın.";
    default:
      return error.message;
  }
};

export const signUpUser = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const fireStore = getFirestore();
    let userID = null;

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(resp => {
        userID = resp.user.uid;
      })
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification();
      })
      .then(() => {
        fireStore
          .collection("users")
          .doc(userID)
          .set({
            userName: user.userName,
            userEmail: user.email,
            city: user.city,
            signUpDate: new Date().toISOString(),
            totalPoint: 0,
            monthPoint: 0,
            lastSession: new Date().toISOString(),
            tryOuts: 3,
            admin: false
          });
      })
      .then(response => {
        dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
};

export const signInUser = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(response => {
        console.log(response);
        if (response.user.emailVerified === true) {
          firestore.get({
            collection: "users",
            doc: response.user.uid,
            storeAs: "user"
          });
          return dispatch(Success(response));
        } else {
          let ErrorMessage = errorMessage(
            { code: "emailNotVerified" },
            getState
          );
          dispatch(Failure(ErrorMessage));
        }
      })
      .catch(error => {
        console.log(error);
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
};

export function logOut() {
  console.log("logout");
  return (dispatch, getState, { getFirebase }) => {
    console.log("logout");
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        return dispatch({
          type: actionTypes.CLEAR_DATA,
          preserve: {}
        });
      })
      .then(response => {
        console.log("logout success");
        dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}

export function fetchAllUsers() {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .get({
        collection: "users"
      })
      .then(response => {
        dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}

export const editUser = (user) => {
  console.log(user);

  return (dispatch, getState, { getFirestore }) => {
    console.log(user);
    const userId = getState().firebase.auth.uid;
    console.log(userId);
    const fireStore = getFirestore();

    fireStore
      .update({ collection: "users", doc: userId }, user)
      .then(resp => {
        return console.log("updated");
      })
      .then(response => {
        console.log("success");
        return dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
};

export function deleteUser(user) {
  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .delete({ collection: "users", doc: user.id })
      .then(resp => {
        return console.log(resp);
      })
      .then(response => {
        dispatch(Success(response));
      })
      .catch(error => {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}

export function resetPassword(email) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log(email);
    const firebase = getFirebase();
    let auth = firebase.auth();
    let lang = getState().language.language;
    firebase.auth().languageCode = lang;
    auth
      .sendPasswordResetEmail(email.email)
      .then(function(response) {
        console.log("email send", email.email);
        dispatch(Success(response));
      })
      .catch(function(error) {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}

export function changePassword(User) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let user = firebase.auth().currentUser;
    let email = user.email;
    console.log(user);
    let password = User.oldPassword;
    let newPassword = User.newPassword;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        user.updatePassword(newPassword);
      })
      .then(function() {
        dispatch(Success());
        console.log("passwordUpdated");
      })
      .catch(function(error) {
        let ErrorMessage = errorMessage(error, getState);
        dispatch(Failure(ErrorMessage));
        return console.log(ErrorMessage);
      });
  };
}

export const addSession = point => {
  console.log(point)
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const date = new Date();
    const userId = getState().firebase.auth.uid;
    const sessionData = { userId, point, date };

    firestore
      .collection("sessions")
      .add(sessionData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
