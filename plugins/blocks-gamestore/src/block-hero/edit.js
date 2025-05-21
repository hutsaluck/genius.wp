import {useBlockProps, RichText, InspectorControls, MediaUpload, MediaPlaceholder} from '@wordpress/block-editor';
import {PanelBody, TextControl, TextareaControl, ToggleControl, Button} from '@wordpress/components';
import {useState} from '@wordpress/element'
import './editor.scss';

const SlideItem = ({index, slide, onImageChange, onRemove}) => {
	return (
		<div className="slide-item">
			<div className="slide-item-image">
				<p>Light Version Logo</p>
				{slide.lightImage && (
					<div className="image-box">
						<img src={slide.lightImage} alt="Slide Image"/>
					</div>
				)}
				<MediaPlaceholder
					icon="format-image"
					onSelect={(media) => onImageChange(media.url, index, "lightImage")}
					onSelectURL={(url) => onImageChange(url, index, "lightImage")}
					labels={{
						title: 'Select Light Image',
						instructions: 'Upload a light image for this slide',
					}}
					accept="image/*"
					allowedTypes={['image']}
					multiple={false}
				/>
			</div>
			<div className="slide-item-image">
				<p>Dark Version Logo</p>
				{slide.darkImage && (
					<div className="image-box">
						<img src={slide.darkImage} alt="Slide Image"/>
					</div>
				)}
				{/*{slide.darkImage && <img src={slide.darkImage} alt="Slide Image"/>}*/}
				<MediaPlaceholder
					icon="format-image"
					onSelect={(media) => onImageChange(media.url, index, "darkImage")}
					onSelectURL={(url) => onImageChange(url, index, "darkImage")}
					labels={{
						title: 'Select Dark Image',
						instructions: 'Upload a dark image for this slide',
					}}
					accept="image/*"
					allowedTypes={['image']}
					multiple={false}
				/>
			</div>
			<Button className='components-button is-destructive' onClick={() => onRemove(index)}>Remove Image</Button>
		</div>
	);
}

export default function Edit({attributes, setAttributes}) {
	const {title, description, link, linkAnchor, video, image, isVideo, slides: initialSlides} = attributes;
	const [isVideoUpload, setIsVideoUpload] = useState(isVideo);
	const [slides, setSlides] = useState(initialSlides || []);

	const onSlideChange = (index, slide) => {
		const updatedSlides = [...slides];
		updatedSlides[index] = slide;
		setSlides(updatedSlides);
		setAttributes({slides: updatedSlides});
	}

	const addSlide = () => {
		const newSlide = {'lightImage': '', 'darkImage': ''};
		const updatedSlides = [...slides, newSlide];
		setSlides(updatedSlides);
		setAttributes({slides: updatedSlides});
	}
	const removeSlide = (index) => {
		const updatedSlides = [...slides];
		updatedSlides.splice(index, 1);
		setSlides(updatedSlides);
		setAttributes({slides: updatedSlides});
	}

	const handleImageChange = (url, index, imageType) => {
		const updatedSlide = {...slides[index], [imageType]: url};
		onSlideChange(index, updatedSlide);
	}
	return (
		<>
			<InspectorControls>
				<PanelBody title="Hero">
					<TextControl
						label="Title"
						value={title}
						onChange={title => setAttributes({title})}
					/>
					<TextareaControl
						label="Description"
						value={description}
						onChange={description => setAttributes({description})}
					/>
					<TextControl
						label="Button URL"
						value={link}
						onChange={link => setAttributes({link})}
					/>
					<TextControl
						label="Button Value"
						value={linkAnchor}
						onChange={linkAnchor => setAttributes({linkAnchor})}
					/>
					<ToggleControl
						label="Upload Video"
						checked={isVideoUpload}
						onChange={(value) => {
							setIsVideoUpload(value);
							setAttributes({isVideo: value, video: '', image: ''});
						}}
					/>
					{isVideoUpload ? (
						video && (
							<video controls muted>
								<source src={video} type="video/mp4"/>
							</video>
						)
					) : (image && <img src={image} alt="Hero Image"/>)}
					<MediaUpload
						onSelect={(media) => {
							if (isVideoUpload) {
								setAttributes({video: media.url});
							} else {
								setAttributes({image: media.url});
							}
						}}
						render={({open}) => (
							<button className='components-button is-secondary' onClick={open}>
								{isVideoUpload ? 'Upload Video' : 'Upload Image'}
							</button>
						)}
					/>
				</PanelBody>
				<PanelBody title="Hero Slider">
					{slides.map((slide, index) => (
						<SlideItem
							key={index}
							index={index}
							slide={slide}
							onImageChange={handleImageChange}
							onRemove={removeSlide}
						/>
					))}
					<Button className='components-button is-primary' onClick={addSlide}>Add Slide</Button>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{image && <img className='hero-image' src={image} alt="Hero Image"/>}
				{video && (
					<video className='video-bg' loop="loop" autoPlay="autoplay" muted="muted"
						   playsInline="playsinline" poster={video} width="100%" height="100%">
						<source className='source-element' src={video} type="video/mp4"/>
					</video>
				)}
				<div className="hero-mask"></div>
				<div className="hero-content">
					<RichText
						tagName="h1"
						className="hero-title"
						value={title}
						onChange={title => setAttributes({title})}
					/>
					<RichText
						tagName="p"
						className="hero-description"
						value={description}
						onChange={description => setAttributes({description})}
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
		</>
	);
}
