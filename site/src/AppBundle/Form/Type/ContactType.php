<?php

namespace AppBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, array(
                'attr' => array(
                    'placeholder' => 'Saisissez votre nom',
                    'pattern'     => '.{2,}' //minlength
                ),
                'label' => 'Votre nom'
            ))
            ->add('email', EmailType::class, array(
                'attr' => array(
                    'placeholder' => 'Saisissez votre adresse Email'
                ),
                'label' => 'Votre Email'
            ))
            ->add('subject', TextType::class, array(
                'attr' => array(
                    'placeholder' => 'Object de votre message',
                    'pattern'     => '.{3,}' //minlength
                ),
                'label' => 'Objet'
            ))
            ->add('message', TextareaType::class, array(
                'attr' => array(
                    'cols' => 80,
                    'rows' => 5,
                    'placeholder' => 'Saisissez un message'
                ),
                'label' => 'Votre message'
            ));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $collectionConstraint = new Collection(array(
            'name' => array(
                new NotBlank(array('message' => 'Ce champ est obligatoire.')),
                new Length(array('min' => 2))
            ),
            'email' => array(
                new NotBlank(array('message' => 'Ce champ est obligatoire.')),
                new Email(array('message' => 'Merci de saisir un Email valide.'))
            ),
            'subject' => array(
                new NotBlank(array('message' => 'Ce champ est obligatoire.')),
                new Length(array('min' => 3))
            ),
            'message' => array(
                new NotBlank(array('message' => 'Ce champ est obligatoire.')),
                new Length(array('min' => 5))
            )
        ));

        $resolver->setDefaults(array(
            'constraints' => $collectionConstraint,
        ));
    }

    public function getName()
    {
        return 'contact';
    }
}