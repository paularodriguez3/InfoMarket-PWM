import { auth, database } from "../../scripts/firebase/firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Verifica que se ha cargado el script correctamente
console.log("¿Se está cargando personal-profile.js?");

// Función que espera a que un elemento esté disponible en el DOM
function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback();
    } else {
        setTimeout(() => waitForElement(selector, callback), 100);
    }
}

// Espera a que el elemento del perfil esté cargado
waitForElement("#profile", () => {
    // Esta función maneja el estado de autenticación y carga los datos
    auth.onAuthStateChanged(user => {
        if (user) {
            // El usuario está autenticado, cargar sus datos
            console.log("Usuario autenticado:", user);
            loadUserData(user.uid);
        } else {
            // No hay usuario autenticado
            console.error("No hay usuario autenticado.");
            // Redirigir al inicio de sesión (si es necesario)
            // window.location.href = "login.html"; // Descomenta si quieres redirigir
        }
    });

    // Cargar los datos del usuario autenticado
    async function loadUserData(uid) {
        const userRef = doc(database, "users", uid);
        try {
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("Datos del usuario:", userData);

                // Rellenar los campos del formulario con los datos del usuario
                document.querySelector("input[placeholder='Nombre']").value = userData.firstName || '';
                document.querySelector("input[placeholder='Primer apellido']").value = userData.lastName1 || '';
                document.querySelector("input[placeholder='Segundo apellido']").value = userData.lastName2 || '';
                document.querySelector("input[placeholder='Nombre de usuario']").value = userData.username || '';
                document.querySelector("input[placeholder='Email']").value = userData.email || '';
                document.querySelector("input[placeholder='Número de telefono']").value = userData.phone || '';
            } else {
                console.error("No se encontraron datos para el usuario en Firestore.");
            }
        } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
        }
    }

    // Modificar perfil
    const form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const updatedFirstName = document.querySelector("input[placeholder='Nombre']").value;
            const updatedLastName1 = document.querySelector("input[placeholder='Primer apellido']").value;
            const updatedLastName2 = document.querySelector("input[placeholder='Segundo apellido']").value;
            const updatedUsername = document.querySelector("input[placeholder='Nombre de usuario']").value;
            const updatedEmail = document.querySelector("input[placeholder='Email']").value;
            const updatedPhone = document.querySelector("input[placeholder='Número de telefono']").value;

            const user = auth.currentUser;
            if (user) {
                try {
                    // Actualizar los datos en Firestore
                    await updateUserProfile(user.uid, {
                        firstName: updatedFirstName,
                        lastName1: updatedLastName1,
                        lastName2: updatedLastName2,
                        username: updatedUsername,
                        email: updatedEmail,
                        phone: updatedPhone
                    });
                    alert("Datos de perfil actualizados con éxito.");
                } catch (error) {
                    console.error("Error al actualizar el perfil:", error);
                }
            } else {
                console.error("No hay usuario autenticado para actualizar el perfil.");
            }
        });
    }

    // Actualizar datos en Firestore
    async function updateUserProfile(userId, updatedData) {
        const userRef = doc(database, "users", userId);
        try {
            await updateDoc(userRef, updatedData);
            console.log("Perfil actualizado correctamente.");
        } catch (error) {
            console.error("Error al actualizar el perfil en Firestore:", error);
        }
    }
});




