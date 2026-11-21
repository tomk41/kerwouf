<?php
/**
 * Formulaire de contact Ker Wouf (bêta).
 * Reçoit le POST des 5 versions, valide, envoie un e-mail à Ker Wouf,
 * puis redirige vers /beta/vN/merci/ (ou vers /beta/vN/?erreur=…#contact).
 * Compatible PHP 7.4 et 8.x (hébergement mutualisé OVH).
 */

const DESTINATAIRE = 'kerwouf@gmail.com';
const EXPEDITEUR = 'no-reply@kerwouf.fr';     // doit être sur le domaine kerwouf.fr
const NOM_EXPEDITEUR = 'Site Ker Wouf (bêta)';
const VERSIONS = ['v1', 'v2', 'v3', 'v4', 'v5'];
const BASE = '/beta';                         // préfixe du site (base dans astro.config.mjs)

function rediriger(string $chemin): void
{
    header('Location: ' . $chemin, true, 303);
    exit;
}

/** Nettoie une ligne de texte : supprime balises, caractères de contrôle et retours à la ligne. */
function ligne(string $cle, int $max): string
{
    $v = isset($_POST[$cle]) && is_string($_POST[$cle]) ? $_POST[$cle] : '';
    $v = strip_tags($v);
    $v = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $v) ?? '';
    $v = trim(preg_replace('/\s+/u', ' ', $v) ?? '');
    return mb_substr($v, 0, $max);
}

/** Nettoie un texte multiligne (message). */
function texte(string $cle, int $max): string
{
    $v = isset($_POST[$cle]) && is_string($_POST[$cle]) ? $_POST[$cle] : '';
    $v = strip_tags($v);
    $v = str_replace(["\r\n", "\r"], "\n", $v);
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', '', $v) ?? '';
    return trim(mb_substr($v, 0, $max));
}

function entete_utf8(string $s): string
{
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

mb_internal_encoding('UTF-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    rediriger(BASE . '/');
}

$version = isset($_POST['version']) && in_array($_POST['version'], VERSIONS, true) ? $_POST['version'] : 'v1';
$merci = BASE . "/$version/merci/";
$erreur = BASE . "/$version/?erreur=";

// Piège anti-spam : un robot remplit le champ caché. On fait comme si tout allait bien.
if (!empty($_POST['site_web'])) {
    rediriger($merci);
}

$nom = ligne('nom', 100);
$email = ligne('email', 150);
$telephone = ligne('telephone', 30);
$message = texte('message', 5000);
$consentement = ($_POST['consentement'] ?? '') === 'oui';

$valide = mb_strlen($nom) >= 2
    && filter_var($email, FILTER_VALIDATE_EMAIL) !== false
    && ($telephone === '' || preg_match('/^[0-9+().\s-]{6,30}$/', $telephone) === 1)
    && mb_strlen($message) >= 2
    && $consentement;

if (!$valide) {
    rediriger($erreur . 'champs#contact');
}

$sujet = entete_utf8('[BETA ' . $version . '] Demande de contact – ' . $nom);

$corps = "Nouveau message envoyé depuis la bêta du site (version $version).\n\n"
    . "Nom : $nom\n"
    . "E-mail : $email\n"
    . 'Téléphone : ' . ($telephone !== '' ? $telephone : 'non renseigné') . "\n\n"
    . "Message :\n$message\n\n"
    . "--\n"
    . 'Reçu le ' . date('d/m/Y à H:i') . ". Répondre à ce message écrit directement à $email.\n"
    . "Rappel : la personne a accepté l'utilisation de ses données pour cette demande (conservation 3 ans).\n";

$entetes = implode("\r\n", [
    'From: ' . entete_utf8(NOM_EXPEDITEUR) . ' <' . EXPEDITEUR . '>',
    'Reply-To: ' . entete_utf8($nom) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$envoye = mail(DESTINATAIRE, $sujet, $corps, $entetes);

rediriger($envoye ? $merci : $erreur . 'envoi#contact');
