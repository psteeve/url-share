(defpackage :url-share
  (:use :common-lisp
   :hunchentoot
        :yason)
  (:export
   :add-url
   :init
   :start-server
   :stop-server))

(in-package :url-share)

(defparameter *urls* nil)

(defvar *base-dir* "~/url-share/")

(defvar *port* 4351)

(defparameter *server* (make-instance
                        'hunchentoot:easy-acceptor
                        :port *port*))

(defun init ()
  (ensure-directories-exist *base-dir*)
  (setf (hunchentoot:acceptor-document-root *server*) *base-dir*))

(defun add-url (url)
  (when (not (member
              url *urls*
              :test
              'equal))
    (push url *urls*)))

(defun list-shared-url ()
  *urls*)

(defun start-server ()
  (hunchentoot:start *server*))

(defun stop-server ()
  (hunchentoot:stop *server*))
