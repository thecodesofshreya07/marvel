import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

function ImagePopup({ imageSrc, title, isOpen, onClose }) {
    const popupRef = useRef(null);

    useEffect(() => {
        if (isOpen && popupRef.current) {
            // GSAP entrance animation
            gsap.fromTo(popupRef.current,
                { opacity: 0, scale: 0.8, rotationY: -45 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    rotationY: 0, 
                    duration: 0.6, 
                    ease: "back.out(1.7)" 
                }
            );

            // Animate image
            const image = popupRef.current.querySelector('.popup-image');
            if (image) {
                gsap.fromTo(image,
                    { opacity: 0, y: 50, scale: 0.9 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        duration: 0.8, 
                        delay: 0.2,
                        ease: "power2.out" 
                    }
                );
            }

            // Handle escape key
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    handleClose();
                }
            };
            window.addEventListener('keydown', handleEsc);
            
            return () => {
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [isOpen]);

    const handleClose = () => {
        if (popupRef.current) {
            // GSAP exit animation
            gsap.to(popupRef.current, {
                opacity: 0,
                scale: 0.8,
                rotationY: 45,
                duration: 0.4,
                ease: "power2.in",
                onComplete: onClose
            });
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="image-popup-overlay"
            onClick={handleClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.92)',
                backdropFilter: 'blur(20px)',
                padding: 16,
                boxSizing: 'border-box',
                overflow: 'auto',
                cursor: 'pointer'
            }}
        >
            <div
                ref={popupRef}
                className="image-popup-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'linear-gradient(180deg, rgba(20,8,35,0.98) 0%, rgba(8,2,18,0.98) 100%)',
                    border: '2px solid #e63946',
                    outline: '1px solid rgba(255,215,0,0.4)',
                    outlineOffset: 2,
                    padding: 0,
                    width: '100%',
                    maxWidth: 900,
                    maxHeight: '90vh',
                    margin: 'auto',
                    position: 'relative',
                    overflow: 'auto',
                    borderRadius: 16,
                    boxShadow: '0 0 80px rgba(230,57,70,0.3), 0 0 120px rgba(123,47,190,0.2)',
                    cursor: 'default'
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                    background: 'linear-gradient(90deg, #c41e3a 0%, #8b0000 50%, #0d0d0d 100%)',
                    borderBottom: '1px solid rgba(255,215,0,0.4)',
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14
                }}>
                    <span style={{
                        fontFamily: "'Orbitron',sans-serif",
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        letterSpacing: '0.35em',
                        color: '#ffd700',
                        textShadow: '0 0 12px rgba(255,215,0,0.6)'
                    }}>
                        ◈ MARVEL STUDIOS — GALLERY
                    </span>
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '10px 18px',
                            background: 'rgba(230,57,70,0.9)',
                            border: '1px solid #ffd700',
                            color: '#fff',
                            fontFamily: "'Orbitron',sans-serif",
                            fontSize: '0.7rem',
                            letterSpacing: '0.2em',
                            fontWeight: 700,
                            boxShadow: '0 0 20px rgba(230,57,70,0.5)',
                            cursor: 'pointer',
                            borderRadius: 8,
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#e63946';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(230,57,70,0.9)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <X size={18} /> CLOSE
                    </button>
                </div>

                {/* Title */}
                <div style={{
                    padding: '20px 24px 16px',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontFamily: "'Orbitron',sans-serif",
                        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        lineHeight: 1.1,
                        margin: 0,
                        textShadow: '0 0 20px rgba(123,47,190,0.4)',
                        color: '#fff'
                    }}>
                        {title}
                    </h2>
                </div>

                {/* Image Container */}
                <div style={{
                    padding: '0 24px 24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src={imageSrc}
                        alt={title}
                        className="popup-image"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '60vh',
                            objectFit: 'contain',
                            borderRadius: 12,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,215,0,0.2)'
                        }}
                    />
                </div>

                {/* Footer */}
                <div style={{
                    padding: '16px 24px',
                    background: 'rgba(0,0,0,0.3)',
                    borderBottomLeftRadius: 14,
                    borderBottomRightRadius: 14,
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontFamily: "'Share Tech Mono',monospace",
                        fontSize: '0.6rem',
                        color: 'rgba(255,255,255,0.5)',
                        letterSpacing: '0.2em',
                        margin: 0
                    }}>
                        Click outside or press ESC to close
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default ImagePopup;
