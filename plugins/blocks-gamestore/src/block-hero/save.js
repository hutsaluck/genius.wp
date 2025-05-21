import {useBlockProps, RichText} from '@wordpress/block-editor';

export default function save({attributes}) {
	const {video, image, title, description, link, linkAnchor, slides} = attributes;
	return (
		<div {...useBlockProps.save()}>
			{image && <img className='hero-image' src={image} alt="Hero Image"/>}
			{video && (
				<video className='video-bg' loop="loop" autoPlay="autoplay" muted="muted"
					   playsInline="playsinline" poster={video} width="100%" height="100%">
					<source className='source-element' src={video} type="video/mp4"/>
				</video>
			)}
			<div className="hero-mask"></div>
			<div className="hero-content">
				<RichText.Content
					tagName="h1"
					className="hero-title"
					value={title}
				/>
				<RichText.Content
					tagName="p"
					className="hero-description"
					value={description}
				/>
				<a href={link} className="hero-button shadow">{linkAnchor}</a>
			</div>
			{slides && (
				<div className="hero-slider">
					<div className="slider-container">
						<div className="swiper-wrapper">
							{slides.map((slide, index) => (
								<div key={index} className="swiper-slide slide-item">
									<img src={slide.lightImage} className="light-logo" alt="Slide Image"/>
									<img src={slide.darkImage} className="dark-logo" alt="Slide Image"/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
