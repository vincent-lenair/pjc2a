<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Form\Type\ContactType;

class DefaultController extends Controller
{
    public function contactAction(Request $request)
    {
        $form = $this->createForm(ContactType::class);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);

            if ($form->isValid()) {
                $message = \Swift_Message::newInstance()
                    ->setSubject($form->get('subject')->getData())
                    ->setFrom($form->get('email')->getData())
                    ->setTo('vincent.lenair@gmail.com')
                    ->setBody(
                        $this->renderView(
                            'mail/mail.html.twig',
                            array(
                                'name' => $form->get('name')->getData(),
                                'message' => $form->get('message')->getData()
                            )
                        )
                    );

                $this->get('mailer')->send($message);

                $request->getSession()->getFlashBag()->add('success', 'Merci pour votre message, votre demande a bien été prise en compte.');

                return $this->redirect($this->generateUrl('pjc2a_contact'));
            }
        }

        return $this->render('pages/contact.html.twig', array(
            'form' => $form->createView()
        ));
    }
}
