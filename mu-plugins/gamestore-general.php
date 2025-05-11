<?php
/**
 * Plugin Name: My First Plugin
 * Plugin URI: https://example.com
 * Description: Это мой первый плагин для WordPress.
 * Version: 1.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL2
 */

add_action('wp_dashboard_setup', 'gamestore_remove_dashboard_widgets');
function gamestore_remove_dashboard_widgets()
{
    global $wp_meta_boxes;

	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['rank_math_dashboard_widget']);
}

// Дозволяємо завантаження SVG файлів
function allow_svg_upload($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	$mimes['svgz'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'allow_svg_upload');

// Виправляємо відображення SVG в медіабібліотеці
function fix_svg_media_display($response) {
	if ($response['mime'] === 'image/svg+xml') {
		$response['sizes'] = array(
			'full' => array(
				'url' => $response['url'],
				'width' => $response['width'],
				'height' => $response['height'],
				'orientation' => $response['width'] > $response['height'] ? 'landscape' : 'portrait'
			)
		);
	}
	return $response;
}
add_filter('wp_prepare_attachment_for_js', 'fix_svg_media_display');

// Додаємо підтримку попереднього перегляду SVG в медіабібліотеці
function svg_thumbnail_url($metadata, $attachment_id) {
	$mime = get_post_mime_type($attachment_id);
	if ($mime === 'image/svg+xml') {
		$metadata = array(
			'width' => 512,
			'height' => 512,
			'file' => get_attached_file($attachment_id)
		);
	}
	return $metadata;
}
add_filter('wp_get_attachment_metadata', 'svg_thumbnail_url', 10, 2);