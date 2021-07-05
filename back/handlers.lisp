(in-package :url-share)

(define-easy-handler (share-url :uri "/add-url")
    ()
  (setf (hunchentoot:content-type*) "application/json")
  (let ((url (parameter "url")))
    (with-output-to-string (*standard-output*)
      (if url
          (progn
            (add-url url)
            (yason:encode-alist '(("ok" . t)))
            (yason:encode-alist '(("ok" . nil))))))))

(define-easy-handler (last-url :uri "/last-url")
    ()
  (setf (hunchentoot:content-type*) "application/json")
  (with-output-to-string (*standard-output*)
    (yason:encode-alist `(("ok" . true) ("url" . ,(car *urls*))))))


